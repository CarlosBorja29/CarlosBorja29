import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  userType: string = 'cliente'; // Por defecto "cliente"

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1)]],
      foto: [''],
      descripcion: ['', Validators.required],
      telefono: [''], // Solo proveedor
      paginaWeb: [''], // Solo proveedor
      redesSociales: [''] // Solo proveedor
    });
  }

  onUserTypeChange(): void {
    if (this.userType === 'proveedor') {
      // Agregar validaciones específicas para proveedor
      this.registerForm.get('telefono')?.setValidators([Validators.required]);
      this.registerForm.get('paginaWeb')?.setValidators([Validators.required]);
      this.registerForm.get('redesSociales')?.setValidators([Validators.required]);
    } else {
      // Quitar validaciones específicas para proveedor
      this.registerForm.get('telefono')?.clearValidators();
      this.registerForm.get('paginaWeb')?.clearValidators();
      this.registerForm.get('redesSociales')?.clearValidators();
    }
    this.registerForm.updateValueAndValidity();
  }

  clearForm(): void {
    this.registerForm.reset();
    this.userType = 'cliente'; // Restablecer a cliente por defecto
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const nombre = this.registerForm.value.nombre;
      Swal.fire({
        title: 'Cliente creado',
        text: `Bienvenido ${nombre}`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        // Redirigir al login después de aceptar el Swal
        this.router.navigate(['/login']);
      });
    }
  }
  
  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}