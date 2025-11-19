import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-forms',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  standalone:true,
  templateUrl: './forms.html',
  styleUrl: './forms.css'
})
export class Forms implements OnInit {
  contactForm!: FormGroup;
  responseEmail:string = '';
  formSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    this.responseEmail = '';

    if (this.contactForm.valid) {
      const templateParams = {
        name: `${this.contactForm.value.prenom} ${this.contactForm.value.nom}`,
        email: this.contactForm.value.email,
        message: this.contactForm.value.message
      };

      emailjs.send('service_sik4hoa', 'template_wnh28ek', templateParams, '5kllW2GsqYxPcUcXu')
        .then((response) => {
          console.log('E-mail envoyé avec succès !', response.status, response.text);
          this.responseEmail = 'Merci de votre message,<br> je vous répondrais dans les plus brefs délais.';
          this.contactForm.reset();
          this.formSubmitted = false;
        }, (error) => {
          this.responseEmail = 'Une erreur est survenue lors de l\'envoi de votre message.';
        });

    } else {
      // Si le formulaire n'est pas valide
      console.log('Le formulaire est invalide. Veuillez corriger les erreurs.');
      this.markAllAsTouched(this.contactForm);
      this.responseEmail = 'Veuillez corriger les erreurs dans le formulaire.';
    }
  }


  private markAllAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markAllAsTouched(control);
      }
    });
  }

}
