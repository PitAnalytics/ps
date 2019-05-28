
var app = new Vue({
    el: '#app',
    data() {

      return{

        peps:{
          hideElement:false,
          branch:'all',
          list:null
        },
        pedidos:{
          id:'1',
          hideElement:true,
          orderText:'',
          list:null
        }

      }

    },

    mounted() {

      axios
      .get(serviceUrl+'/peps')
      .then(response => {
        this.peps.list=response.data;
        for (let i = 0; i < this.peps.list.length; i++) {

          this.peps.list[i].Presupuesto_Inicial=stdToEng(this.peps.list[i].Presupuesto_Inicial);
          this.peps.list[i].Gasto_Real=stdToEng(this.peps.list[i].Gasto_Real);
          this.peps.list[i].Gasto_Pedidos=stdToEng(this.peps.list[i].Gasto_Pedidos);
          this.peps.list[i].Presupuesto_Disponible=stdToEng(this.peps.list[i].Presupuesto_Disponible);
          
        }
        console.log(this.peps.list);
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
      
    },

    methods:{

      //
      pepRequest(){

        axios
        .get(serviceUrl+'/peps/branch/'+this.peps.branch)
        .then(response => {
          this.peps.list=response.data;
          for (let i = 0; i < this.peps.list.length; i++) {
            this.peps.list[i].Presupuesto_Inicial=stdToEng(this.peps.list[i].Presupuesto_Inicial);
            this.peps.list[i].Gasto_Real=stdToEng(this.peps.list[i].Gasto_Real);
            this.peps.list[i].Gasto_Pedidos=stdToEng(this.peps.list[i].Gasto_Pedidos);
            this.peps.list[i].Presupuesto_Disponible=stdToEng(this.peps.list[i].Presupuesto_Disponible);
          }
          console.log(this.peps.list);
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)

      },

      //peticion de pedidos por ID de pep
      orderRequest(id){

        this.pedidos.id=id;
        this.peps.hideElement=true;
        this.pedidos.hideElement=false;
        let orderSearch='*';

        if(this.pedidos.orderText===''){

          orderSearch='*';

        }
        
        else{
          orderSearch=this.pedidos.orderText;
        }

        axios
        .get(serviceUrl+'/pedidos/search/'+this.pedidos.id+'/'+orderSearch)
        .then(response => {
          this.pedidos.list=response.data;

          for (let i = 0; i < this.pedidos.list.length; i++) {

            this.pedidos.list[i].Importe=stdToEng(this.pedidos.list[i].Importe);
            
          }

          console.log(this.pedidos.list);

        }).catch(error => {
          
          console.log(error);
          this.errored = true;

        }).finally(() => this.loading = false)

      },

      //cerramos orden
      orderClose(){
        this.peps.hideElement=false;
        this.pedidos.hideElement=true;
        this.orderText='';
      }

    }

  });