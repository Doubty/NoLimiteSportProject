import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Footer from "../../components/Footer";
import InfoCard from "../../components/InfoCard";
import InstagramSection from "../../components/InstagramSection";
import NavBar from "../../components/NavBar";
import SectionTitle from "../../components/SectionTitle";
import { mockProducts } from "../../mockData";
import { Product } from "../../types/product";
import "./styles.css";

const AllProducts = () => {
    const [products, setProducts] = useState<Product[]>(mockProducts);

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        
        if (value === "") {
            setProducts(mockProducts);
            return;
        }

        const searchedValues = products.filter(product => product.nome.includes(value));
        setProducts(searchedValues);
    }

    return (
        <>
            <NavBar/>

            <section className="allEvents_section">
                <div className="container">
                    <div className="row">
                            <SectionTitle text="Todos os Produtos"/>

                            <div className="searchBar col-sm-12">
                                <input type="text" name="searchEvent" id="searchEvent" placeholder="Digite o nome de um produto..." onChange={handleInputChange}/>
                                <FontAwesomeIcon className="icon-search" icon={ faSearch } />
                            </div>

                            {products.map((product) =>
                                <InfoCard url={`/product/${product.id}`} key={product.id} title={product.nome} description={"R$ " + product.preco} img_url={"/product_imgs/" + product.img_url}/>
                            )}
                    </div>
                </div>
            </section>

            <InstagramSection/>

            <Footer/>   
        </>
    );
}

export default AllProducts;