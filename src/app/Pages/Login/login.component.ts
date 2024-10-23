import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm: FormGroup;
  visible: boolean = false;
  registerAccountForm: FormGroup<any>;
  nomeLabel: string = "Nome completo";
  cpfLabel: string = "CPF*";
  nomePlaceholder: string = "João da Silva";
  cpfPlaceholder: string = "000.000.000-00";

  showDialog() {
    this.visible = true;
  }

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService
  ) {
    this.loginForm = this.fb.group({
      login: ["", [Validators.required]],
      senha: ["", [Validators.required]],
    });

    this.registerAccountForm = this.fb.group({
      email: ["", [Validators.required]],
      senha: ["", [Validators.required]],
      nomeCompleto: ["", [Validators.required]],
      cpfCnpj: ["", [Validators.required]],
      contaLogista: [],
    });
  }

  private closeModalAndResetForm(): void {
    this.visible = false;
    this.registerAccountForm.reset();
  }

  updateFields() {
    const isLogista = this.registerAccountForm.get("contaLogista")?.value;

    if (isLogista) {
      this.nomeLabel = "Razão social";
      this.cpfLabel = "CNPJ*";
      this.nomePlaceholder = "Empresa XYZ";
      this.cpfPlaceholder = "00.000.000/0000-00";
    } else {
      this.nomeLabel = "Nome completo";
      this.cpfLabel = "CPF*";
      this.nomePlaceholder = "João da Silva";
      this.cpfPlaceholder = "000.000.000-00";
    }
  }

  public login(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this._authService.signIn(credentials.login, credentials.senha).subscribe({
        next: (response: HttpResponse<any>) => {
          const token = response.headers.get("authorization");
          this._authService.saveToken(token);
          this._router.navigate(["dashboard"]);
        },
      });
    }
  }

  public registerAccount(): void {
    if (this.registerAccountForm.valid) {
      const userRequest = this.registerAccountForm.value;

      this._authService
        .signUp({
          account_type: userRequest.contaLogista ?  "shopkeeper" : "standard",
          email: userRequest.email,
          name: userRequest.nomeCompleto,
          password: userRequest.senha,
          registration: userRequest.cpfCnpj,
        })
        .subscribe({
          next: () => {
            this._confirmationService.confirm({
              header: 'Abertura de conta',
              message: 'Tudo pronto, agora você já pode acessar a sua conta através do painel de login.',
              icon: 'pi pi-check-circle',
              acceptIcon:"none",
              rejectIcon:"none",
              rejectVisible: false,
              rejectButtonStyleClass:"p-button-text",
              acceptLabel: 'Ok',
              accept: () => {
                this.closeModalAndResetForm();
              }
            })
          },
          error: (error: HttpErrorResponse) => {
            if(error.status == 400) {
              const message = userRequest.contaLogista ? 'Cnpj já cadastrado' : 'CPF já cadastrado'
              this._messageService.add({severity: 'error', summary: 'Erro', detail: message})
              return;
            }

            this._messageService.add({severity: 'error', summary: 'Erro', detail: 'Algo inesperado ocorreu!'})

          },
        });
    }
  }
}
