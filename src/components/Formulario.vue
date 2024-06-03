<template>
  <section class="src-components-formulario">
    <div class="jumbotron">
      <h1>Formulario</h1>
      <hr>
      <form @submit.prevent="enviar">
        <div class="form-group">
          <label for="nombreCompleto" class="nombreCompleto">Nombre Completo</label>
          <input id="nombreCompleto" class="form-control" type="text" v-model.trim="formData.nombreCompleto" @input="formDirty.nombreCompleto = true">
          <div v-if="(!formData.nombreCompleto || !this.nombreValido()) && formDirty.nombreCompleto" class="alert alert-danger mt-1">
          <span v-if="!this.formData.nombreCompleto">Campo Requerido</span>
          <span v-else>Este campo solo puede contener letras</span>
        </div>
        </div>
        <div class="form-group">
          <label for="dni" class="dni">DNI</label>
          <input id="dni" class="form-control" type="number" v-model.trim="formData.dni" @input="formDirty.dni = true">
          <div v-if="!this.dniOk() && formDirty.dni" class="alert alert-danger mt-1">Campo Requerido</div>
        </div>
        <div class="form-group">
          <label for="montoAdeudado" class="montoAdeudado">Monto Adeudado</label>
          <input id="montoAdeudado" class="form-control" type="number" v-model.trim="formData.montoAdeudado" @input="formDirty.montoAdeudado = true">
          <div v-if="!this.montoDeudaOk() && formDirty.montoAdeudado" class="alert alert-danger mt-1">Campo Requerido</div>
        </div>
        <div class="form-group">
          <label for="montoPagado" class="montoPagado">Monto Pagado</label>
          <input id="montoPagado" class="form-control" type="number" v-model.trim="formData.montoPagado" @input="formDirty.montoPagado = true">
          <div v-if="!this.montoPagadoOk() && formDirty.montoPagado" class="alert alert-danger mt-1">Campo Requerido</div>
        </div>
        <button v-if="this.datosOk()" class="btn btn-success my-3" type="submit">Registrar</button>
      </form>

      <table class="table table-dark">
        <tr>
          <th>Nombre Completo</th>
          <th>Dni</th>
          <th>Monto Adeudado</th>
          <th>Monto Pagado</th>
        </tr>
        <tr>
          <td>{{ formData.nombreCompleto }}</td>
          <td>{{ formData.dni }}</td>
          <td>{{ formData.montoAdeudado }}</td>
          <td>{{ formData.montoPagado }}</td>
        </tr>
      </table>

      <table class="table table-dark">
        <tr>
          <th>Nombre Completo</th>
          <th>Dni</th>
          <th>Fecha Y Hora</th>
          <th>Monto Adeudado</th>
          <th>Monto Pagado</th>
          <th>Saldo</th>
        </tr>
        <tr v-for="(registro, index) in registros" :key="index" :style="{ 'background-color': getColor(registro.saldo) }">
          <td>{{ registro.nombreCompleto }}</td>
          <td>{{ registro.dni }}</td>
          <td>{{ registro.fecha }}</td>
          <td>{{ registro.montoAdeudado }}</td>
          <td>{{ registro.montoPagado }}</td>
          <td>{{ registro.saldo }}</td>
        </tr>
      </table>
    </div>
 
  </section>
</template>

<script>
export default {
  name: 'src-components-formulario',
  data() {
    return {
      registros: [],
      formData: this.inicializarData(),
      formDirty: this.inicializarData(),
    };
  },
  methods: {
    datosOk(){
      return this.nombreValido() && this.dniOk() && this.montoDeudaOk() && this.montoPagadoOk()
    },
    dniOk(){
    return this.formData.dni
    },
    montoDeudaOk(){
      return this.formData.montoAdeudado
    },
    montoPagadoOk(){
      return this.formData.montoPagado
    },

    enviar() {
      this.formData.fecha = new Date().toLocaleString();
      let data = { ...this.formData, saldo: this.formData.montoAdeudado - this.formData.montoPagado };
      this.registros.push(data);
      this.formData = this.inicializarData();
      this.formDirty = this.inicializarData();
    },
    inicializarData() {
      return {
        nombreCompleto: '',
        dni: '',
        montoAdeudado: '',
        montoPagado: '',
        fecha: '',
      };
    },
    getColor(saldo) {
      if (saldo === 0) return 'green';
      else if (saldo > 0) return 'red';
      else return 'blue';
    },
    nombreValido(){
      const regex =/^[a-zA-Z\s]+$/;
      if(this.formData.nombreCompleto.match(regex)){
        return true
      }
      else {
        return false
      }
    }
  },
};
</script>

<style scoped lang="css">
.src-components-formulario {
}
</style>