import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../../slice/productSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slice/authSlice";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, isLoading, isError } = useSelector(
    (state) => state.products,
  );

  const handleEdit = (id) => {
    console.log(id, "Edit");
    navigate(`/add-product/${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (confirmDelete) {
      dispatch(deleteProduct(id));
    }
  };

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) return <h2>Loading products...</h2>;
  if (isError) return <h2>Something went wrong</h2>;

  return (
    <div className="product_page">
      <div className="d_flex">
        <h2>Products</h2>
        <div className="d_flex_end">
          <button className="btn" onClick={() => navigate("/add-product")}>
            Add Product
          </button>
          <button className="btn" onClick={handleLogOut}>
            Logout
          </button>
        </div>
      </div>

      <div className="all_product">
        {products.map((item) => (
          <div className="product_cart" key={item.id}>
            <h4>{item.title}</h4>
            <img src={item.thumbnail} width={120} />
            <p>{item.description}</p>
            <strong>₹ {item.price}</strong>
            <div className="d_flex_end">
              <button className="btn" onClick={() => handleEdit(item.id)}>
                Edit
              </button>
              <button className="btn" onClick={() => handleDelete(item.id)}>
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
