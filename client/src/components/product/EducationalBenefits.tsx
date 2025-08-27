import { Product } from "../../lib/types";

interface EducationalBenefitsProps {
  product: Product;
}

const EducationalBenefits = ({ product }: EducationalBenefitsProps) => {
  if (!product.educationalBenefits || product.educationalBenefits.length === 0) {
    return null;
  }

  return (
    <div className="bg-white py-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Manfaat Edukatif</h2>
        <ul className="space-y-4">
          {product.educationalBenefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EducationalBenefits;