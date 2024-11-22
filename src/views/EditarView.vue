<template>
    <div>
        <h1>Datos del producto</h1>
        <div v-if="producto !== null"> 
        <ul>
            <li> <p>Tipo y marca del Arma:</p> {{ producto.param1 }} </li>
            <li> <p>Modelo:</p> {{ producto.param2 }}</li>
        </ul>
        <h1>Editar Producto</h1>
        <input type="text" v-model="editarProducto.marca" placeholder="Nueva Arma" required/>
        <input type="text" v-model="editarProducto.modelo" placeholder="Nuevo Modelo" required/>
        <button @click="guardarEdicion(producto)">Guardar modificaciones</button>
        </div>
    </div>
</template>
    
<script>
import axios from 'axios';

export default {
    name: 'EditarView',
    props: {
        id:{
            type: String,
            required: true,
        }
    },
    data() {
        return {
            producto: null,
            editarProducto: { 
                marca: '', 
                modelo: '' },
            }
    },
    async created() {
        await this.LeerProducto();
    },
    methods: {
        async LeerProducto() {
        try {
            const response = await axios.get(`https://api.yumserver.com/16449/generic/producto/${this.id}`);
            this.producto = response.data;
        } catch (error) {
            alert('No hay descripción');
        }
        },
        async guardarEdicion(producto) {
            if (this.editarProducto.marca.trim().length === 0 || this.editarProducto.modelo.trim().length === 0) {
            alert('Favor de completar todos los campos');
            return;
        } 
        try {
        const prodActualizado = {
            idcod: producto.idcod,
            param1: this.editarProducto.marca,
            param2: this.editarProducto.modelo,
        };
        await axios.patch(`https://api.yumserver.com/16449/generic/producto`,prodActualizado,);
        
        alert('Producto actualizado correctamente.');
        this.editarProducto.marca = "";
        this.editarProducto.modelo = "";
        await this.LeerProducto()

    } catch (error) {
        console.error("Error al editar el producto:", error);
        alert('No se pudo editar el producto.');
    }
        },
    },
}
</script>