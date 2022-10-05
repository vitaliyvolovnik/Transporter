package com.example.transportation.configureation;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    private Info apiInfo() {
        return new Info().title("Transporter")
                .description("Transporter Swagger")
                .version("0.1")
                .contact(new Contact()
                        .name("Vitaliy")
                        .url("www.google.com")
                        .email("vitaliyvolovnik@gmail.com"));
    }
    @Bean
    public OpenAPI openApiConfig(){
        return new OpenAPI().info(apiInfo());
    }


}
