import { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  updateProduct,
  fetchProductById,
  resetProductState,
} from "../../slice/productSlice";
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selectedProduct,
    isLoading,
    isError,
    isSuccess,
  } = useSelector((state) => state.products);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && selectedProduct) {
      setValue("productName", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
    }
  }, [id, selectedProduct, setValue]);


  const onSubmit = (data) => {
    if (id) {
      dispatch(updateProduct({ id, data }));
    } else {
      dispatch(addProduct(data));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      dispatch(resetProductState());
      navigate("/products");
    }
  }, [isSuccess, dispatch, navigate, reset]);

  return (
    <div className="add_product_page">
      <h2>{id ? "Edit Product" : "Add Product"}</h2>

      {isError && <p style={{ color: "red" }}>Something went wrong</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Product Name"
          name="productName"
          register={register}
          rules={{ required: "Product Name Required" }}
          error={errors.productName?.message}
        />

        <InputField
          label="Description"
          name="description"
          register={register}
          rules={{ required: "Description Required" }}
          error={errors.description?.message}
        />

        <InputField
          label="Price"
          name="price"
          register={register}
          rules={{ required: "Price Required" }}
          error={errors.price?.message}
        />

        <button type="submit"  style={{width:"100%"}} disabled={isLoading}>
          {isLoading ? "Saving..." : id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
