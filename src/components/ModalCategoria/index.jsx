import "./style.css"
import closeIcon from '../../assets/closeIcon.svg'
import React, { useState } from "react";

function ModalCateg(props) {
   const [dadosCateg, setDadosCateg] = useState({ descricao: "", tipo: '' })

   function handleChangeCateg(e) {
      setDadosCateg({
         ...dadosCateg,
         [e.target.name]: e.target.value,
      });
   }

   return (
      <div className="cardCategTrans">
         <div className="ContainerEditCateg">
            <h1>Editar Categoria</h1>
            <img src={closeIcon} alt="Icone fechar" />
            <div className="MenuEditCateg">
               <div>
                  <label>Tipo</label>
                  <select
                     name="tipo"
                     onChange={(e) => handleChangeCateg(e)}
                     defaultValue="Default"
                  >
                     <option value="Default" disabled>Tipo</option>
                     <option value='Entrada'>Entrada</option>
                     <option value='Saída'>Saída</option>
                  </select>

               </div>

               <div>
                  <label>Descrição</label>
                  <input placeholder="Descrição"
                     name="descricao"
                     value={dadosCateg.descricao}
                     onChange={(e) => handleChangeCateg(e)} />
               </div>

               <div >
                  <label></label>
                  <button>Atualizar</button>
               </div>
            </div>
         </div >
      </div>
   );
}

export default ModalCateg;