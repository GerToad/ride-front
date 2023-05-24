import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './AddItem.css';

const AddItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [status, setStatus] = useState('nuevo');
  const [usefulLife, setUsefulLife] = useState(0);
  const [purchaseYear, setPurchaseYear] = useState(0);
  const [ok, setOk] = useState('');
  const user = JSON.parse(localStorage.getItem("user"));
  const [itemId, setItemId] = useState(useParams().itemId); 
  const navigate = useNavigate();



    useEffect(() => {
      const fetchItemData = async () => {
        if (itemId) {
          try {
            const response = await axios.get(`http://localhost:5000/item/getItem?id=${itemId}`, {
              headers: { "Content-Type": "application/json" },
            });

            if (response.data.status === "success") {
              const item = response.data.item;
              setName(item.name);
              setDescription(item.description);
              setCost(item.cost);
              setStatus(item.status);
              setUsefulLife(item.usefulLife);
              setPurchaseYear(item.purchaseYear)
            }
          } catch (error) {
            console.error(error);
          }
        }
      };

      fetchItemData();
    }, [itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform the necessary actions to save the item data
    // For simplicity, we'll just log the values here
    try {
      const response = await axios.post("http://localhost:5000/item/add", 
                { name, description, cost, status, usefulLife, purchaseYear, "userId": user._id},
                {headers: { "content-type": "application/json" }});

        if (response.data.status === "success") {
          console.log("Item added successfully");
          // Display a success message or perform any other desired actions
          setOk("success");
        } else {
          console.log("Item addition failed");
          // Display a fail message or perform any other desired actions
          setOk("fail");
        } 

        // Clear the form fields
        setName('');
        setDescription('');
        setCost('');
        setUsefulLife(0);
        setPurchaseYear(0);
    } catch (error) {
      // Handle error, such as displaying an error message
      console.error(error);
      setOk("fail");
    }

  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Perform the necessary actions to save the item data
    // For simplicity, we'll just log the values here
    try {
      const response = await axios.patch("http://localhost:5000/item/edit", 
                { name, description, cost, status, usefulLife, purchaseYear, "_id": itemId},
                {headers: { "content-type": "application/json" }});

        if (response.data.status === "success") {
          console.log("Item updated successfully");
          // Display a success message or perform any other desired actions
          setOk("success");
        } else {
          console.log("Item update failed");
          // Display a fail message or perform any other desired actions
          setOk("fail");
        } 

        setTimeout(() => {
          // Code to be executed after 4 seconds
          setItemId(null)
          navigate("/");
        }, 4000);
    } catch (error) {
      // Handle error, such as displaying an error message
      console.error(error);
      setOk("fail");
    }

  };
    //const isFormValid = name && cost && status && usefulLife && purchaseYear;
    const isFormValid = true;

  return (
    <div className="add-item-container">
        {itemId === undefined ? <h2>Añadir Articulo</h2> : <h2>Cambiar Articulo</h2>}        
        {ok === "success" && (
            itemId === undefined ? 
                <div className="success-message">
                Articulo añadido exitosamente!
                </div> : 
                <div className="success-message">
                Articulo actualizado exitosamente!
                </div> 
        )}
        {ok === "fail" && (
          <div className="fail-message">
            Adision del item fallo. Por favor intente nuevamente
          </div>
        )}
      <form>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripcion</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cost">Costo</label>
          <input
            required
            type="text"
            id="cost"
            name="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Estado</label>
          <select id="status" name="status" onChange={(e) => setStatus(e.target.value)}>
            <option value="nuevo">Nuevo</option>
            <option value="viejo">Viejo</option>
            <option value="usado">Usado</option>
          </select >
        </div>        
        <div className="form-group">
          <label htmlFor="usefulLife">Vida útil (en años)</label>
          <input
            required
            type="number"
            id="usefulLife"
            name="usefulLife"
            value={usefulLife}
            onChange={(e) => setUsefulLife(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="purchaseYear">Año de compra</label>
          <input
            required
            type="number"
            id="purchaseYear"
            name="purchaseYear"
            value={purchaseYear}
            onChange={(e) => setPurchaseYear(e.target.value)}
          />
        </div>

        {itemId === undefined ? 
            <button type="submit"  disabled={!isFormValid} onClick={handleSubmit}>Añadir</button> : 
            <button type="submit"  disabled={!isFormValid} onClick={handleUpdate}>Actualizar</button>
        }        
        
      </form>
    </div>
  );
};

export default AddItem;

// Gastos
/*
    Gasto anual en combustible = (50,000 km / 100 km) * 4 kg/km * Precio del GLP
    Para calcular el gasto anual en combustible de un vehículo de transporte público que utiliza GLP, necesitaríamos conocer la eficiencia del vehículo en términos de kilómetros por litro. Sin embargo, es posible proporcionar una estimación aproximada utilizando los datos generales de consumo de GLP mencionados anteriormente.

    Supongamos que un autobús de transporte público recorre alrededor de 50,000 kilómetros al año y consume 4 kilogramos de GLP por cada 100 kilómetros, como mencionamos anteriormente. La conversión aproximada de kilogramos a litros de GLP es de 1 kilogramo = 1.96 litros.

    Gasto anual en combustible = (50,000 km / 100 km) * 4 kg/km * 1.96 litros/kg * Precio del GLP

Revista: La revista o verificación vehicular es un requisito anual para asegurar que el vehículo cumpla con las normas de emisiones y seguridad. El costo de la revista puede variar dependiendo de la entidad federativa y la antigüedad del vehículo, pero puede oscilar entre 500 y 2,000 pesos mexicanos al año.

Tarjetón: El tarjetón es un documento de identificación y control para los conductores de transporte público. El costo puede variar según la entidad federativa, pero generalmente ronda entre 200 y 500 pesos mexicanos anuales.

Curso: Para obtener o renovar la licencia de conducir para transporte público, a menudo se requiere un curso de capacitación especializado. El costo del curso puede variar según la institución y la localidad, pero generalmente está en el rango de 1,000 a 5,000 pesos mexicanos.

Placas: El costo de las placas vehiculares puede variar según la entidad federativa y el tipo de vehículo. Para un vehículo de transporte público, las placas suelen tener un costo más alto que las placas de un vehículo particular. Dependiendo de la entidad federativa, las placas pueden costar entre 2,000 y 10,000 pesos mexicanos anuales.

Licencia: La licencia de conducir para transporte público también tiene un costo asociado. El costo puede variar según la entidad federativa y la vigencia de la licencia, que puede ser de uno a cinco años. Aproximadamente, el costo puede oscilar entre 500 y 1,500 pesos mexicanos por renovación.

#################### impuestos  ################################
Impuesto sobre la Renta (ISR): El ISR es un impuesto que grava las ganancias obtenidas por los transportistas. La tasa de ISR varía dependiendo de los ingresos y el tipo de empresa, pero generalmente oscila entre el 30% y el 35% de las utilidades obtenidas.

Impuesto al Valor Agregado (IVA): El IVA es un impuesto que se aplica a la venta de bienes y servicios. En el caso del transporte público, las tarifas de transporte pueden estar exentas o tener una tasa reducida de IVA. La tasa de IVA general en México es del 16%, pero las tarifas de transporte pueden estar sujetas a una tasa reducida del 8%.

Impuesto Especial sobre Producción y Servicios (IEPS): El IEPS es un impuesto que se aplica a productos específicos, como los combustibles. Los transportistas están sujetos al IEPS en relación con el consumo de combustible utilizado en sus vehículos. El costo del IEPS varía según el tipo de combustible y su precio de venta, pero actualmente se sitúa alrededor de 4.60 pesos por litro de gasolina y 3.88 pesos por litro de diésel.

Contribuciones al Instituto Mexicano del Seguro Social (IMSS): LLos costos exactos de la tenencia vehicular pueden variar según el estado y la valuación fiscal del vehículo. En los estados donde aún se aplica, los costos suelen oscilar entre el 1% y el 2.5% del valor del vehículo. Sin embargo, te recomendaría verificar la legislación vigente en tu estado para obtener información precisa sobre la tenencia vehicular y los costos asociados.

Además de la tenencia, existen otros posibles impuestos y contribuciones relacionados con el transporte y la propiedad de vehículos en México. Algunos de ellos son:

Impuesto sobre la adquisición de vehículos automotores (ISAI o ISAN): Este impuesto se aplica al momento de adquirir un vehículo nuevo o usado. Los costos varían según el estado y la valuación del vehículo, pero generalmente oscilan entre el 2% y el 5% del valor del vehículo.os transportistas también tienen la obligación de realizar contribuciones al IMSS para el seguro social y la seguridad social de sus empleados. Los costos varían según el número de empleados y las percepciones salariales, pero pueden representar un porcentaje significativo de la nómina.

################## ¿Cada cuánto se hace cambio de aceite?
En primer lugar, es importante tener en cuenta que el aceite pierde sus propiedades de lubricación en la medida que se agregan kilómetros recorridos al vehículo, es por ello que es necesario realizar el cambio de aceite con cierta frecuencia. Lo más común es que se realice el cambio de aceite a los 10.000 kilómetros, luego a los 20.000 km, posteriormente se hace el cambio de aceite a los 30.000 y asi sucesivamente cada 10.000 km.

Esta cantidad de kilómetros va a depender de diferentes factores como el tipo de aceite, que puede ser mineral, semisintético o sintético; cuyas diferencias explicare más adelante; pero también hay que tener en cuenta que en la medida que el motor del vehículo acumule mayor kilometraje, las partes del motor van acumulando desgaste, por lo cual resulta necesario disminuir la frecuencia con la que se realiza el cambio para así poder proteger el motor. Entonces, en este orden de ideas podemos sugerir dos situaciones:

Vehículos con menos de 100.000 kilómetros deben realizar el cambio de aceite aproximadamente cada 10.000 kilómetros.
Vehículos con más de 100.000 kilómetros deben realizar el cambio de aceite aproximadamente cada 7.000 kilómetros.

Sin embargo, en muchos lugares, los autobuses urbanos suelen recorrer distancias promedio que oscilan entre 150 y 300 kilómetros al día. Estas cifras son solo una estimación general y pueden variar en función de las condiciones específicas de cada ciudad o región.

Como también he comentado anteriormente, el aceite utilizado puede ser de dos tipos: mineral o sintético; en cualquiera de los dos casos se encuentra en botellas comúnmente denominadas “cuartos” (1/4) por que generalmente, un vehículo comercial como un Renault Logan o un Chevrolet Sonic requiere de 4/4.

Precio aceite mineral: esta es la opción tradicional, es un aceite que no tiene muchos aditivos y por eso mismo es más económico; un cuarto de aceite mineral de buena calidad puede tener un costo entre $15.000 y $20.000 pesos por cuarto, por lo que este rubro de aceite puede alcanzar un valor entre $60.000 y $80.000.
Precio aceite sintético: esta aceite se diferencia del aceite mineral por la cantidad de aditivos con los que cuenta para optimizar su rendimiento dentro del motor, pero así mismo su costo es mas elevado: cada cuarto puede estar entre $20.000 y $30.000 pesos, por eso para un vehículo comercial, el costo del solo aceite puede estar entre $80.000 y $120.000.

*/
