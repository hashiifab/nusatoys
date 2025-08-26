import { Product } from "../../lib/types";

interface ProductSpecificationsProps {
  product: Product;
}

const ProductSpecifications = ({ product }: ProductSpecificationsProps) => {
  const { specifications } = product;

  if (!specifications) return null;

  const specItems = [
    { label: "Usia", value: specifications.age },
    { label: "Eksperimen", value: specifications.experiments },
    { label: "Keamanan", value: specifications.safety },
    { label: "Berat", value: specifications.weight },
    { label: "Sertifikat", value: specifications.certificate },
    { label: "Panduan", value: specifications.language },
  ].filter((item) => item.value); // Filter out undefined values

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Spesifikasi Produk</h2>
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {specItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                    {item.label}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecifications;