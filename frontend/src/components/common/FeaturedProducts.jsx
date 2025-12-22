import React, { useEffect, useState } from "react";
import ProductImg from "../../assets/images/eleven.jpg";
import { apiUrl } from "./http";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [products, setproducts] = useState([]);

  const featuredProducts = async () => {
    await fetch(apiUrl + "/get-featured-products", {
      method: "GET",
      header: {
        "Conten-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const top6Products = result.data ? result.data.slice(0, 6) : [];
        setproducts(top6Products);
      });
  };

  useEffect(() => {
    featuredProducts();
  }, []);
  return (
    <>
      <section className="section-2 py-5">
        <div className="container-md">
          <h2>Featured Products</h2>
          <div className="row mt-4">
            {products &&
              products.map((product) => {
                return (
                  <div className="col-md-4 col-6" key={`product-${product.id}`}>
                    <div className="product card border-0">
                      <div className="card-img">
                        <Link to={`/product/${product.id}`}>
                          <img
                            src={product.image_url}
                            alt=""
                            className="w-100"
                          />
                        </Link>
                      </div>
                      <div className="card-body pt-3">
                        <Link to={`/product/${product.id}`}>
                          {product.title}
                        </Link>
                        <div className="price">
                          ${product.price} &nbsp;
                          {product.compare_price && (
                            <span className="text-decoration-line-through">
                              ${product.compare_price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
