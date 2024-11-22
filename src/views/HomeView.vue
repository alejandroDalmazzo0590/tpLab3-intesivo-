<template>
  <div class="cabecera">
    <header>
      <h1> ARMERIA DALMAZZO </h1>
      <h2 class="subtitulo"> "El reducto del CAZADOR Y TIRADOR" </h2>
    </header>

        <main>
      <section>
        <h3>Cargar nueva Arma de fuego / aire pre-comprimido</h3>
        <form @submit.prevent="agregarProducto">
          <p>Tipo de Arma y Marca</p>
          <input 
            v-model="nuevoProducto.marca" 
            placeholder="Agregar"
            required
          />
          <p>Modelo</p>
          <input 
            v-model="nuevoProducto.modelo" 
            placeholder="Agregar" 
            required 
          />
          <br><br>
          <button> Agregar </button>
        </form><br>

        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Tipo de Arma y Marca</th>
              <th>Modelo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(producto) in productos" :key="producto.idcod">
              <td>{{ producto.idcod }}</td>
              <td>{{ producto.param1 }}</td>
              <td>{{ producto.param2 }}</td>
              <td>
                
                <button @click="vistaEditar(producto.idcod)">Editar</button>
                <button @click="eliminarProducto(producto.idcod)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>


      </main>

      <footer class="pie">
      <p>alejandro.dalmazzo@gmail.com </p>
      <p>Mitre 762 - San Francisco - Cordoba - Argentina</p>
      </footer>
  </div>
</template>

      <script>
import axios from 'axios';
const APIproducto = 'https://api.yumserver.com/16449/generic/producto';

export default {
  data() {
    return {
      productos: [],
      nuevoProducto: { 
        marca: '', 
        modelo: '' },
    };
  },
  methods: {
    vistaEditar(id) {
      this.$router.push({ name: 'EditarView', params: { id } });
    },
    async leerTabla() {
      try {
        const response = await axios.get(APIproducto)
        this.productos = [...response.data]
      } catch (error) {
        console.log(error);
      }
    },
    async agregarProducto() {
      if (!this.nuevoProducto.marca.trim() || !this.nuevoProducto.modelo.trim()) {
        this.mensajeError = 'Todos los campos son necesarios';
       return;
      }
      try {
        const producto ={
          param1: this.nuevoProducto.marca,
          param2: this.nuevoProducto.modelo,

        }
        await axios.post(APIproducto, producto);
        alert('Producto agregado de manera correcta.')

        this.nuevoProducto.marca = '';
        this.nuevoProducto.modelo = '';
        await this.leerTabla();
      } catch (error) {
        console.log(error);
      }
    },
    async eliminarProducto(i) {
      try {
      const confirmacion = confirm("¿Estás seguro de que deseas eliminar el producto seleccionado?");

      if (confirmacion) {
        const prodEliminar = {
          idcod: i,
        };
        
        await axios.delete(APIproducto, { data: prodEliminar });
        await this.leerTabla();
        
        alert('Producto eliminado de manera correcta.');
      } else {
        alert('Eliminación cancelada.');
      }
    } catch (error) {
      console.log(error);
      alert('No se pudo eliminar el producto.');
    }
    },
  }, 
    async mounted() {
    await this.leerTabla();
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

.subtitulo{
  background-color:red;
}

.pie{
  background-color: rgb(162, 175, 169);
}

</style>
    








