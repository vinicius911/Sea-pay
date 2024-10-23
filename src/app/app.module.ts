import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routes";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { DashboardModule } from "./Pages/Dashboard/dashboard.module";
import { LoginModule } from "./Pages/Login/login.module";
import { TransferenciaModule } from "./Pages/Transferencia/transferencia.module";
import { TransacoesModule } from "./Pages/Transacoes/transacoes.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    TransferenciaModule,
    DashboardModule,
    HttpClientModule,
    TransacoesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
