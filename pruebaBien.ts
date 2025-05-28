//*Ejemplo 10: Sistema de Gestión de Clientes Bancarios
//Enunciado Detallado:
//Un banco gestiona clientes que tienen nombre, número de cuenta y saldo.
//Clientes pueden tener:
// Cuentas de ahorro, con tasa de interés.
// Cuentas corrientes, con límite de sobregiro.
//Requisitos:
// Clase base CuentaBancaria, con depositar(), retirar() y validaciones.
// Clases hijas CuentaAhorro y CuentaCorriente, con comportamientos diferentes para retirar().
// Uso de encapsulamiento para proteger el saldo.
// Evaluacion 3ero A POO / ESTUDIANTES: Delgado Muñoz Luiz y Mendoza 
class CuentaBancaria {
    public nombre: string;
    public numeroDeCuenta: number;
    public saldo: number;

    constructor(nombre: string, numeroDeCuenta: number, saldo: number) {
        this.nombre = nombre;
        this.numeroDeCuenta = numeroDeCuenta;
        this.saldo = saldo;
    }

    depositar(monto: number): void {
        if (monto > 0) {
            this.saldo += monto;
            console.log('Se ha depositado exitosamente el dinero: $${monto}');
        } else {
            console.log("El monto a depositar debe ser mayor que cero.");
        }
    }

    retirar(monto: number): void {
        if (monto > 0 && monto <= this.saldo) {
            this.saldo -= monto;
            console.log('Se ha retirado exitosamente el dinero: $${monto}');
        } else {
            console.log("Fondos insuficientes o monto inválido.");
        }
    }

    saldoActual(): string {
        return 'Nombre: ${this.nombre}, Cuenta: ${this.numeroDeCuenta}, Saldo: $${this.saldo}';
    }
}


   class CuentaAhorro extends CuentaBancaria {
    private tasaInteres: number;

    constructor(nombre: string, numeroDeCuenta: number, saldo: number, tasaInteres: number) {
        super(nombre, numeroDeCuenta, saldo);
        this.tasaInteres = tasaInteres;
    }

    aplicarInteres(): void {
        const interes = this.saldo * this.tasaInteres;
        this.saldo += interes;
        console.log('Interés aplicado: $${interes}. Nuevo saldo: $${this.saldo}');
    }

    override retirar(monto: number): void {
        if (monto > 0 && monto <= this.saldo) {
            this.saldo -= monto;
            console.log('Retiro exitoso en cuenta de ahorro: $${monto}');
        } else {
            console.log("Fondos insuficientes o monto inválido en cuenta de ahorro.");
        }
    }
}


    class CuentaCorriente extends CuentaBancaria{
        private limiteSobregiro: number;

        constructor(nombre: string, numeroDeCuenta: number, saldo: number, limiteSobregiro: number) {
        super(nombre, numeroDeCuenta, saldo);
        this.limiteSobregiro = limiteSobregiro;
    }
    override retirar(monto: number): void {
        if (monto > 0 && monto <= this.saldo + this.limiteSobregiro) {
            this.saldo -= monto;
            console.log('Retiro exitoso en cuenta corriente: $${monto}');
        } else {
            console.log("Límite de sobregiro excedido o monto inválido.");
        }
    }
}

const ahorro = new CuentaAhorro("Ana Pérez", 1001, 1000, 0.03);
const corriente = new CuentaCorriente("Luis Gómez", 2002, 500, 300);

ahorro.depositar(200);
ahorro.retirar(150);
ahorro.aplicarInteres();
console.log(ahorro.saldoActual());

corriente.depositar(100);
corriente.retirar(700); 
corriente.retirar(300); 
console.log(corriente.saldoActual());