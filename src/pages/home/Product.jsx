
import { SingleProduct } from "./SingleProduct.jsx";
export function ProductPage({ products, LoadCartItems }) {


    return (
        <>
            <div className="products-grid">
                {products.map((product) => {
                    return (
                        <SingleProduct key={product.id} product={product} LoadCartItems={LoadCartItems} />
                    );
                })}


            </div >
        </>
    );
}