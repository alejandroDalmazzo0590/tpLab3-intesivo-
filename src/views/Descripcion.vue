<template>
    <div>
      <h1>Info del cliente amigo</h1>
      <div v-if="cliente !== null"> 
        <ul>
            <li> <p>id:</p> {{ cliente.id }} </li>
            <li> <p>Apellido:</p> {{ cliente.param1 }}</li>
            <li> <p>Nombre:</p> {{ cliente.param2 }}</li>
            <li> <p>Dirección:</p> {{ cliente.param3 }}</li>
            <li> <p>Teléfono</p> {{ cliente.param4 }}</li>
            
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
    export default {
        name: 'DescripcionView',
        props: {
            id:{
                type: String,
                required: true,
            }
        },
        data() {
            return {
                cliente: null,
              }
        },
        async created() {
            try{
                const responde = await axios.get('https://api.yumserver.com/16449/generic/cliente/' + this.id);
                this.cliente = responde.data;
            } catch (error) {
                alert('No existe descripcion');
            }
        },
    }
  </script>