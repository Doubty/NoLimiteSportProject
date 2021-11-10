import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import InstagramSection from "../../components/InstagramSection";
import NavBar from "../../components/NavBar";
import SectionTitle from "../../components/SectionTitle";
import { mockProducts } from "../../mockData";
import { Product } from "../../types/product";
import "./styles.css";

const ProductPage = () => {
    const { productId } = useParams<{productId: string}>();
    const [product, setProduct] = useState<Product>({
        id: 0,
        img_url: "",
        nome: "",
        preco: 0,
        descricao: ""
    });

    useEffect(() => {
        const theProduct = mockProducts.find(element => element.id === parseInt(productId));
        if (theProduct !== undefined)
            setProduct(theProduct);
    }, [productId]);

    return (
        <>
            <NavBar/>

            <section className="product_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 product_image">
                            <img src={"/img/product_imgs/" + product.img_url} alt={product.nome} />
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 product_details">
                            <SectionTitle text={product.nome}/>
                            <div className="product_description">
                                {product.descricao}
                            </div>
                            <div className="product_price">
                                R$ {product.preco}
                            </div>
                            <button type="button" className="buy_btn">Comprar</button>
                        </div>
                    </div>
                </div>                
            </section>

            <InstagramSection/>

            <Footer/>
        </>
    )
}

export default ProductPage;