import Loading from "@/app/loading";
import styles from "./page.module.css";
import prisma from "@/prisma/prismaClient";
import { editProductAction } from "@/utils/actions";
import FormActionField from "@/components/fields/formActionField/FormActionField";
import Image from "next/image";
import DeleteProductBtn from "@/components/buttons/action/deleteProduct/DeleteProductBtn";
import CreateVariant from "@/components/forms/admin/product/variant/CreateVariant";
import NewCreateVariant from "@/components/forms/admin/product/variant/NewCreateVariant";
import { unstable_noStore } from "next/cache";
import { getProductById } from "@/utils/data-access/products";
import UpsertImage from "@/components/forms/admin/product/image/upsertImage/UpsertImage";

//  use for dynamic server components
export const dynamic = "force-dynamic";

export default async function EditProduct({
  params,
}: {
  params: { id: number };
}) {
  //  use for dynamic server components
  unstable_noStore();

  //fetch product based on id
  const product = await getProductById(params.id);
  if (!product) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.wrap}>
        <h1>{product.name}</h1>
        <form>
          {product &&
            [product].map((item) => {
              const {
                id,
                name,
                description,
                price,
                stock,
                highlighted,
                variants,
                images,
              } = item;

              //  sort images in for delete
              const imgArr = [];
              if (images.length) {
                for (let index = 0; index < images.length; index++) {
                  const element = images[index];
                  const match = element.url.match(/images\/(.*)/);
                  if (match) {
                    imgArr.push(match[1]);
                  }
                }
              }
              return (
                <div key={id} className={styles.inputs}>
                  <strong>
                    <DeleteProductBtn id={id} images={imgArr} />
                  </strong>
                  <FormActionField
                    defaultValue={name}
                    id="name"
                    label="product name"
                    required
                    type="text"
                  />
                  <FormActionField
                    defaultValue={description}
                    id="description"
                    label="product description"
                    required
                    type="text"
                  />
                  <FormActionField
                    defaultValue={price}
                    id="price"
                    label="product price"
                    required
                    type="text"
                  />
                  <FormActionField
                    defaultValue={stock}
                    id="stock"
                    label="product stock"
                    required
                    type="text"
                  />
                  <select
                    defaultValue={String(highlighted)}
                    name="highlighted"
                    id="highlighted"
                  >
                    <option value="false">false</option>
                    <option value="true">true</option>
                  </select>

                  <NewCreateVariant data={variants} />
                  {/* {images &&
                    images.map((item) => (
                      <Image
                        src={item.url}
                        key={item.id}
                        alt="image"
                        height={400}
                        width={400}
                      />
                    ))} */}
                  <UpsertImage id={Number(params.id)} images={images} />
                </div>
              );
            })}
          <button formAction={editProductAction.bind(null, product.id)}>
            update
          </button>
        </form>
      </div>
    </>
  );
}
