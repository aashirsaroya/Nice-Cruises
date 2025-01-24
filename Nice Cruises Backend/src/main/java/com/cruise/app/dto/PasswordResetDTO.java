package com.cruise.app.dto;


import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PasswordResetDTO {
    @NotNull
    private String email;
    @NotNull
    private String newPassword;
    @NotNull
    private String otp;

}
