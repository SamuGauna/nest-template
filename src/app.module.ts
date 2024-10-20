import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppImports } from './app.imports';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './bcrypt/bcript.module';
import { EmailsModule } from './emails/emails.module';
import { HealthModule } from './health/health.module';
import { UsersModule } from './modules/users/users.module';
import { ClientModule } from './modules/client/client.module';
import { CompanyModule } from './modules/company/company.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CartModule } from './modules/cart/cart.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    ...AppImports,
    HealthModule,
    EmailsModule,
    BcryptModule,
    AuthModule,
    UsersModule,
    ClientModule,
    CompanyModule,
    OrdersModule,
    CartModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
