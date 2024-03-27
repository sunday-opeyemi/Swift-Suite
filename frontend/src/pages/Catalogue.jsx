import React from "react";
import { catalogue } from "./Cataloguedata";
import {BsSearch} from 'react-icons/bs'


const Catalogue = () => {

  const vendorIndex = (i) => {
      console.log(i);
  }

  return (
    <div className="bg-green-50">
      <div className="lg:ms-[24%] lg:me-[2%]">
      <div className='flex fixed lg:w-[50%] md:w-[100%] rounded-2xl lg:ms-0 md:ms-0 ms-5 items-center lg:gap-[100px] md:gap-[100px] bg-green-50' >
    <input className='lg:block hidden bg-transparent px-3 outline-none  w-[150px] md:w-[100%] lg:w-[100%]' type="text" placeholder='Search...'  />
            <button type='submit' className='lg:block hidden text-white bg-green-800 rounded p-3 cursor-pointer lg:ms-28' ><BsSearch className='lg:block hidden' /></button>
        </div>
        <div className="flex gap-6 border border-red-500 mb-34">
          <div className="border bg-white w-[80%]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui nostrum numquam tempore cupiditate, adipisci blanditiis quae itaque dolorem velit ab cumque illum dolore, similique molestiae debitis! Voluptate labore adipisci enim. Hic excepturi aliquid, in dolores libero repudiandae quisquam sunt rem perspiciatis tempore minima enim quibusdam quos nesciunt accusamus a reprehenderit expedita. Sint cupiditate, vel hic similique ut incidunt veniam iste harum. Aliquid, aliquam. Aperiam quo eius, incidunt porro fuga odio sed quos, id aspernatur non alias libero quia soluta! Harum quos, recusandae adipisci nobis dolor saepe voluptates eius hic aliquid animi laborum earum aperiam provident deleniti tempore amet repellat, alias quod repudiandae aspernatur in voluptatibus rerum, nostrum placeat. Suscipit, aut enim. Laboriosam repellat nulla neque, sint fuga ex quaerat iste non consequatur debitis et, cumque vero, modi suscipit reiciendis ab totam commodi voluptatibus quod quidem est necessitatibus maxime! Necessitatibus, molestias modi? Aliquid, inventore hic eveniet ratione, quasi harum vitae dignissimos voluptatem fugit aut non laudantium quaerat dolorum, debitis iusto. Dolore, iure. Nisi perspiciatis nemo vel iste aut? Et rem ut labore adipisci odit modi, accusamus animi magnam consectetur deserunt. Numquam deleniti vel molestias quia voluptatibus maiores natus nulla, necessitatibus voluptates dolorum exercitationem? Culpa quod ullam recusandae eveniet, animi architecto voluptatum deserunt consequatur natus, id veritatis modi accusamus. Optio, possimus! Laboriosam iste, veniam culpa aut alias aliquam nesciunt sint quasi illum ut in doloribus eligendi saepe eaque? Animi, voluptatibus? Beatae possimus dicta modi sapiente itaque nemo porro illo eum asperiores. Cupiditate autem numquam odit est dolore explicabo? Animi, pariatur. Amet, eum qui esse necessitatibus, ipsum quae et autem ullam velit ipsam rerum voluptatibus suscipit. Ipsum ex architecto atque adipisci, vitae quas magnam eveniet, hic in dolores laborum consectetur, nemo dolorum quis. Voluptate fuga dignissimos distinctio eius exercitationem minima consequuntur architecto atque dolores explicabo, ipsam labore. Magni asperiores quasi iusto animi itaque nesciunt velit voluptatum harum earum similique perspiciatis necessitatibus enim unde odit laboriosam corrupti, dolore at eum. Quasi dolorum suscipit eveniet amet illum aut facere, quibusdam ullam delectus voluptates debitis? A modi maxime esse ea unde commodi ut deleniti? Vitae nam incidunt placeat? Tenetur magnam commodi quas adipisci natus unde voluptatum. Eos voluptatem sed labore dolor temporibus nisi vero incidunt? Nobis magni laborum, dolore velit quod aperiam corporis adipisci illum consequuntur modi perspiciatis labore voluptate illo rerum deserunt amet earum, inventore assumenda repudiandae quis. Quas sapiente saepe molestiae quod? Vero, veniam dolorum fuga asperiores iste quidem atque necessitatibus esse tempora accusantium assumenda. Nobis eius omnis consectetur suscipit culpa vero doloribus cum sed sint perspiciatis aliquam cupiditate, nihil ab at nostrum itaque minus. Mollitia quod cupiditate amet explicabo repellendus! Tenetur, saepe mollitia? Ipsa voluptatem delectus sunt, culpa rem sequi ad similique. Tenetur aliquid illo eligendi accusantium nostrum fugiat fuga at doloremque nulla quae cumque possimus eveniet provident quaerat distinctio explicabo necessitatibus exercitationem, voluptatum ratione nisi, eaque excepturi maxime. Cumque doloribus aliquid deleniti modi molestias eaque, rerum dignissimos assumenda impedit ad recusandae error at minus? Inventore minima nostrum ipsa cum, nam voluptas nisi optio nemo distinctio fugit. Ducimus iusto ipsa dolorem repellendus atque? lorem1000
          </div>
          <div className="w-[12%] border border-black bg-white fixed top-50 right-[50px] h-screen overflow-y-auto">
            <p className=" bg-white border text-center py-3 font-bold text-xl  border-b-green-500">Vendors</p>
            {catalogue.map((item, i) => (
              <div onClick={()=>vendorIndex(item.id)} className=" bg-white  mx-2" key={i}>
                <p>{item.name}</p><hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogue;