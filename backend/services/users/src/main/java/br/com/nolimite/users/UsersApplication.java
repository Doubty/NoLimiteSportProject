package br.com.nolimite.users;

import java.time.LocalDate;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.format.Formatter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import br.com.nolimite.users.repositories.UsuarioRepository;
import br.com.nolimite.users.utils.LocalDateFormatter;

@SpringBootApplication
public class UsersApplication {

	@Autowired
	UsuarioRepository userRepo;
	private static final Logger logger = 
			LoggerFactory.getLogger(UsersApplication.class);
	
	public static void main(String[] args) {
		SpringApplication.run(UsersApplication.class, args);
		logger.info("Hello start");
	}
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
	@Bean
	@Primary
	public Formatter<LocalDate> localDateFormatter() {
	    return new LocalDateFormatter();
	}
	 @Bean                  
	      public WebMvcConfigurer corsConfigurer(){
	        return new WebMvcConfigurer(){
	              @Override
	              public void addCorsMappings(CorsRegistry registry){
	               registry.addMapping("/**").allowedOrigins("*","http://localhost:3000");
	                                                                     
	             }                                                        
	         };                                                           
	      } 

}
