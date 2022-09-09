import "./style.css"
import closeIcon from '../../assets/closeIcon.svg'
import React, { useState } from "react";
import { money } from '../../utils/formatter'

const arrayCategorias = ["Alimentação", "Investimento", "Educação"]

function ModalTrans(props) {
   const [dadosTrans, setDadosTrans] = useState({
      type: '',
      date: '',
      categories: '',
      description: '',
      value: '',
   })

   function handleChangeTrans(e) {
      setDadosTrans({
         ...dadosTrans,
         [e.target.name]: e.target.value,
      });
   }

   return (
      <div className="cardCategTrans">
         <div className="ContainerEditTrans">
            <h1>Editar Transação</h1>
            <img src={closeIcon} alt="Icone fechar" />

            <div className="MenuEditTrans">
               <div>
                  <label>Tipo</label>
                  <select
                     name="type"
                     onChange={(e) => handleChangeTrans(e)}
                     defaultValue="Default"
                  >
                     <option value='Default' disabled>Tipos</option>
                     <option value="Entrada">Entrada</option>
                     <option value="Saída">Saída</option>
                  </select>
               </div>

               <div>
                  <label>Data</label>
                  <input
                     type="date"
                     name="date"
                     onChange={(e) => handleChangeTrans(e)}
                  />
               </div>

               <div>
                  <label>Categoria</label>
                  <select
                     name="categories"
                     onChange={(e) => handleChangeTrans(e)}
                     defaultValue="Default"
                  >
                     <option value='Default' disabled>Categorias</option>
                     {arrayCategorias.map((item, index) => (
                        <option key={index}>{item}</option>
                     ))}
                  </select>
               </div>

               <div>
                  <label>Descrição</label>
                  <input
                     placeholder="Descrição"
                     name="description"
                     onChange={(e) => handleChangeTrans(e)}
                  />
               </div>

               <div>
                  <label>Valor</label>
                  <input
                     placeholder="Valor"
                     name="value"
                     onChange={(e) => handleChangeTrans(e)}
                     value={money(dadosTrans.value)}
                  />
               </div>

               <div >
                  <label></label>
                  <button
                     type="submit"
                  >
                     Atualizar
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ModalTrans;