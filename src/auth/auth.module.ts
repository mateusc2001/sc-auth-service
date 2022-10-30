import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
    providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtStrategy],
    exports: [AuthService],
    imports: [
        HttpModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '12h' },
        })
    ]
})
export class AuthModule { }
