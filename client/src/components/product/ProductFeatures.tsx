import { Product } from "../../lib/types";

interface ProductFeaturesProps {
  product: Product;
}

const ProductFeatures = ({ product }: ProductFeaturesProps) => {
  return (
    <div className="bg-white py-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Deskripsi Produk</h2>
        <div className="text-gray-700">
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures;