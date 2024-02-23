// "use client";
// import "./style.scss";
// import { Card } from "antd";
// import Image, { ImageLoader, StaticImageData } from "next/image";
// import { FC, useEffect, useState } from "react";
// import delivery from "../../../public/images/svg/Truck-blue.svg";
// import { useRouter } from "next/router";
// import heart_red from "./../../../public/images/svg/heart_red.svg";
// import heart_white from "./../../../public/images/svg/heart_white.svg";
// import { openDialog } from "store/components/customDialog/dialogSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useTranslation } from "next-i18next";
// import { getWishlistIdState } from "store/selector/rootSelector";
// import {
//   useCreateItemToWishlistMutation,
//   useDeleteItemFromWishlistMutation,
// } from "store/wishlist/wishlistApi";
// import { formatMoneyCurrency } from "@/utils/commonFunction";
// import { BTN_CONFIRM_NONE } from "@/utils/constants";
// interface ProductCardProps {
//   id?: string;
//   itemId?: string;
//   title?: string;
//   description?: string;
//   img?: StaticImageData;
//   loader?: ImageLoader;
//   sale_price?: number;
//   init_price?: number;
//   className?: string;
//   sx?: {};
//   delivery_type?: number;
//   isDisplayHome?: boolean;
// }
// const { Meta } = Card;

// const ProductCard: FC<ProductCardProps> = (props) => {
//   const {
//     itemId,
//     id,
//     title,
//     description,
//     loader,
//     sale_price,
//     className,
//     delivery_type,
//     isDisplayHome = false,
//     sx,
//   } = props;
//   const init_price = +(props?.init_price ?? 0);
//   const img = props?.img ?? "";

//   const router = useRouter();
//   const { t } = useTranslation("common");
//   const dispatch = useDispatch<any>();
//   //   const wishlistId = useSelector(getWishlistIdState);
//   const wishlistId = "";
//   const [isFavorite, setIsFavorite] = useState<any>(false);
//   const [itemIdWishlist, setItemIdWishlist] = useState<any>("");

//   useEffect(() => {
//     if (itemId !== "") {
//       setIsFavorite(true);
//       setItemIdWishlist(itemId);
//     } else {
//       setIsFavorite(false);
//       setItemIdWishlist("");
//     }
//   }, [itemId]);

//   const [createItemToWishlist] = useCreateItemToWishlistMutation();
//   const [deleteItemFromWishlist] = useDeleteItemFromWishlistMutation();

//   const onCreateItemToWishlist = async (item: any) => {
//     if (wishlistId != "") {
//       const res = await createItemToWishlist(item);
//       //@ts-ignore
//       const data = res?.data;
//       if (data) {
//         // dispatch(
//         //   openDialog({
//         //     type: "info",
//         //     content: "DONE",
//         //     confirmText: t("OK"),
//         //   })
//         // );
//       } else {
//         dispatch(
//           openDialog({
//             type: "info",
//             content: t("Failed"),
//             confirmText: BTN_CONFIRM_NONE,
//           })
//         );
//       }
//     } else {
//       dispatch(
//         openDialog({
//           type: "confirm",
//           title: t("common.login_required_notice"),
//           content: t("common.login_confirm"),
//           confirmText: t("common.button.login_btn"),
//           closeText: t("common.button.cancel"),
//           maskClosable: true,
//           actionConfirm: () => {
//             router.push("/login");
//           },
//           actionCancel: () => {},
//         })
//       );
//     }
//   };

//   const onDeleteItemFromWishlist = async (item: any) => {
//     const res = await deleteItemFromWishlist(item);
//     //@ts-ignore
//     const data = res?.data;
//     if (data) {
//       // dispatch(
//       //   openDialog({
//       //     type: "info",
//       //     content: "DONE",
//       //     confirmText: t("OK"),
//       //   })
//       // );
//     } else {
//       dispatch(
//         openDialog({
//           type: "info",
//           content: t("Failed"),
//           confirmText: BTN_CONFIRM_NONE,
//         })
//       );
//     }
//   };

//   //get/create Wishlist
//   const isMobile = () => {
//     if (typeof document !== "undefined") {
//       return window.innerWidth <= 768;
//     }
//     return true;
//   };

//   return (
//     <Card
//       className={`card-meta ${className}`}
//       hoverable
//       style={{
//         width: isMobile() ? "160px" : "280px",
//         height: isMobile() ? "320px" : "495px",
//         ...sx,
//       }}
//       cover={
//         <>
//           <Image
//             style={{
//               height: isMobile() ? "160px" : isDisplayHome ? "312px" : "240px",
//               objectFit: "cover",
//             }}
//             // loader={loader}
//             unoptimized={true}
//             src={img}
//             width={isMobile() ? 160 : isDisplayHome ? 280 : 220}
//             height={isMobile() ? 160 : isDisplayHome ? 312 : 240}
//             className={className}
//             alt="img-item"
//           />
//           <div className="shopping-cart">
//             <div className="df-center-card">
//               <Image
//                 // className="heart"
//                 alt="icon"
//                 src={isFavorite ? heart_red : heart_white}
//                 style={{ width: "auto", height: "auto" }}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   let item = {
//                     wishlist_id: wishlistId,
//                     product_id: id,
//                   };
//                   if (!isFavorite) {
//                     onCreateItemToWishlist(item);
//                   }
//                   if (isFavorite) {
//                     onDeleteItemFromWishlist({
//                       ...item,
//                       item_id: itemIdWishlist,
//                     });
//                   }
//                 }}
//               />
//             </div>
//             {/* <ShoppingCartOutlined style={{ fontSize: "18px" }} /> */}
//           </div>
//         </>
//       }
//       onClick={() => router.push(`/productDetail?id=${id}`)}
//     >
//       {/* zzzzzzzzzzzzzzz */}
//       <Meta
//         title={title}
//         description={description}
//         //@ts-ignore
//       />
//       {!!sale_price ? (
//         <>
//           <div className="init-price line-through">
//             {formatMoneyCurrency(
//               init_price / 100,
//               delivery_type == 1 ? true : false
//             )}
//           </div>
//           <div className="sale-price">
//             {formatMoneyCurrency(
//               sale_price / 100,
//               delivery_type == 1 ? true : false
//             )}

//             <span className="discount-percent">
//               {((1 - sale_price / init_price) * 100).toFixed()}%
//             </span>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="sale-price">
//             {formatMoneyCurrency(
//               init_price / 100,
//               delivery_type == 1 ? true : false
//             )}
//           </div>
//         </>
//       )}

//       {delivery_type === 1 ? (
//         <div className="df-center-delivery">
//           <Image src={delivery} alt="logo-delivery" />
//           <div className="delivery delivery-mall">
//             {t("product_details.direct_delivery")}
//           </div>
//         </div>
//       ) : null}
//     </Card>
//   );
// };

const ProductCard = () => {
  return <></>;
};

export default ProductCard;
