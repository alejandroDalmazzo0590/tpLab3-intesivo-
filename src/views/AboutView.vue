<template>
  <div class="cabecera">
    <header>
        <h1> Clientes Amigos</h1>
      </header>
      <main>
        <section>
          <h2>Cargar nuevo cliente amigo</h2>
          <form @submit.prevent="agendarCliente">
            
            <p>Apellido   <input
              v-model="nuevoCliente.apellido" 
              placeholder="Agregar APELLIDO" 
              required />
            </p>
            <p>Nombre   <input
              v-model="nuevoCliente.nombre" 
              placeholder="Agregar NOMBRE" 
              required />
            </p>
            <p>Dirección   <input
              v-model="nuevoCliente.direccion" 
              placeholder="Agregar DIRRECION" 
              required />
            </p>
            <p>Teléfono   <input
              v-model="nuevoCliente.telefono" 
              placeholder="Agregar TELEFONO" 
              required />
            </p>
            <button> Agregar </button>
          </form><br>
  
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Clientes</th>
                <th>Info básica</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cliente) in clientes" :key="cliente.idcod">
                <td>{{ cliente.id }}</td>
                <td>{{ cliente.param1 }}  {{ cliente.param2 }}</td>
                <td><router-link :to="{name:'DescripcionView', params: {id: cliente.idcod}}"
                  > ver + </router-link></td>
                <td>
                  <button @click="editarCliente(cliente)">Editar</button>
                  <button @click="eliminarCliente(cliente.idcod)">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
  
      <footer class=" pie">
      <p>alejandro.dalmazzo@gmail.com </p>
      <p>Mitre 762 - San Francisco - Cordoba - Argentina</p>
      </footer>
    </div>
</template>
  
<script>
  import axios from 'axios';
  const APIcliente = 'https://api.yumserver.com/16449/generic/cliente';

  export default {
  data() {
    return {
      clientes: [],
      nuevoCliente: { 
        apellido: '', 
        nombre: '' ,
        direccion: '', 
        telefono: '',},
    };
  },
  methods: {
  
  async leerTablaCliente() {
    try {
      const response = await axios.get(APIcliente)
      this.clientes = [...response.data]
    } catch (error) {
      console.log(error);
    }
  },
  async agendarCliente() {
    if (this.nuevoCliente.apellido.trim().length === 0 || this.nuevoCliente.nombre.trim().length === 0 ||
        this.nuevoCliente.direccion.trim().length === 0 || this.nuevoCliente.telefono.trim().length === 0) {
        alert('Todos los campos son necesarios.');
    return;
    }
    if (!/^\d+$/.test(this.nuevoCliente.telefono)) {
    alert('Solo se admiten valores numericos.');
    return;
  }
    try {
      const cliente ={
        param1: String(this.nuevoCliente.apellido),
        param2: String(this.nuevoCliente.nombre),
        param3: String(this.nuevoCliente.direccion),
        param4: String(this.nuevoCliente.telefono),
      
      }
      await axios.post(APIcliente, cliente);
      alert('Cliente amigo generado de manera correcta.'),

      this.nuevoCliente.apellido = '';
      this.nuevoCliente.nombre = ''
      this.nuevoCliente.direccion = '';
      this.nuevoCliente.telefono = '';
      
      
      await this.leerTablaCliente();

    } catch (error) {
      console.log(error);
      alert('No se pudo generar cliente amigo intente nuevamente.');
    }
  },
  async eliminarCliente(i) {
    try {
    const confirmacion = confirm("Estás seguro de que deseas eliminar este cliente amigo???");

    if (confirmacion) {
      const prodEliminar = {
        idcod: i,
      };
      
      await axios.delete(APIcliente, { data: prodEliminar });
      await this.leerTablaCliente();
      
      alert('Cliente amigo eliminado de manera correcta.');
    } else {
      alert('Eliminación cancelada.');
    }
  } catch (error) {
    console.log(error);
    alert('No se pudo eliminar el cliente.');
  }
  },
  async editarCliente(cliente) {
  try {
  const nuevoApellido = prompt("Ingrese nuevo apellido:", cliente.param1);
  const nuevoNombre = prompt("Ingrese nuevo nombre:", cliente.param2);
  const nuevoDirrecion = prompt("Ingrese nueva dirección:", cliente.param3);
  const nuevoTelefono = prompt("Ingrese nuevo teléfono:", cliente.param4);
  


  if (nuevoApellido.trim().length === 0 || nuevoNombre.trim().length === 0 ||
      nuevoDirrecion.trim().length === 0 || nuevoTelefono.trim().length === 0 ) {
      alert('Todos los campos son necesarios, no es posible actualizar datos');
    return;
    }
    if (!/^\d+$/.test(nuevoTelefono)) {
    alert('El teléfono debe contener solo números.');
    return;
    }

  
    const clienteActualizado = {
      idcod: cliente.idcod,
      param1: String(nuevoApellido),
      param2: String(nuevoNombre),
      param3: String(nuevoDirrecion),
      param4: String(nuevoTelefono),
      
    };
  
    await axios.patch(APIcliente, clienteActualizado,);
  
    await this.leerTablaCliente();
    alert('Cliente amigo actualizado correctamente.');
  //}
} catch (error) {
  console.error("Error al actualizar cliente:", error);
  alert('No se pudo actualizar cliente.');
}
  },
}, 
  async mounted() {
  await this.leerTablaCliente();
}
}
</script >
  




<style scoped>

.cabecera {
  width: 100%;
  max-width: 600px;
  border-radius: 20px;
  overflow: hidden;
  background-color: rgb(153, 229, 188);
  margin: auto;
  border: 1px solid #4b3c3c; 
    
}
.pie{
  background-color: rgb(162, 175, 169);
}
</style>
