import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import InfoCard from "../../components/InfoCard";
import InstagramSection from "../../components/InstagramSection";
import NavBar from "../../components/NavBar";
import SectionTitle from "../../components/SectionTitle";
import gateway from "../../services/gateway";
import { Product } from "../../types/product";
import "./styles.css";

const AllProducts = () => {
    const [products, setProducts] = useState<Product[]>();

    useEffect(() => {
        gateway.get("/produtoes/todos").then(res => {
            const getRes : Product [] = res.data;
            setProducts(getRes);
        });
    }, []);

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        
        if (value === "") {
            gateway.get("/produtoes/todos").then(res => {
                const getRes : Product [] = res.data;
                setProducts(getRes);
            });
            return;
        }

        if (products !== undefined) {
            const searchedValues = products.filter(product => product.nome.includes(value));
            setProducts(searchedValues);
        }
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

                            {
                                (products !== undefined) ?
                                    products.map((product) =>
                                        <InfoCard url={`/product/${product.id}`} key={product.id} title={product.nome} description={"R$ " + product.preco} img_url={"/product_imgs/product1.jpg"}/>
                                    )
                                :
                                "Não há produtos"
                            }
                    </div>
                </div>
            </section>

            <InstagramSection/>

            <Footer/>   
        </>
    );
}

export default AllProducts;