export default function filtrar(setCaminhoes: any, carts: any, filter: any) {
    console.log("Opa")
    console.log(carts)  
    if (filter.brand){
      setCaminhoes(carts.filter((o:any) => o.brands.name === filter.brand.name))
    }
    if (filter.model){
      setCaminhoes(carts.filter((o:any) => o.cart_model.name === filter.model.name))
    }
    if (filter.type){
      setCaminhoes(carts.filter((o:any) => o.cart_type.name === filter.type.name))
    }
    if (filter.wheel){
      setCaminhoes(carts.filter((o:any) => o.wheel.name === filter.wheel.name))
    }
}