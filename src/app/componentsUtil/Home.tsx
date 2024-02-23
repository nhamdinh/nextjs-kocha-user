"use client";
import "./style.scss";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Col, Row, Typography } from "antd";
import { useRouter } from "next/router";
import item2 from "./../../public/images/Items/item2.jpg";
import item5 from "./../../public/images/Items/item5.jpg";
import { useEffect, useState } from "react";
import {
  useGetPopupQuery,
  useGetTopBuyQuery,
  useGetTopLatestQuery,
  useGetTopSaleQuery,
  useGetTopSellQuery,
} from "store/home/homeApi";
import {
  useGetProductsQuery
} from "store/product/productApi";
import Head from 'next/head';
//For me it didn't work without the following import...
import Image from 'next/image'
// import { openModal } from "store/components/customModal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getCookie, renderBrandName, setItemWishlist } from "@/utils/commonFunction";
import icToTop from "./../../public/images/svg/ic_to_top.svg";
import { DEFAULT_LANG } from "@/utils/constants";
// import { getWishlistProductsState } from "store/selector/rootSelector";
type Props = {
  // Add custom props here
  // popup: any
};

const Home = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation("common");

  const arr = [...new Array(6)];
  const dispatch = useDispatch();
  const router = useRouter();
  const [topSale, setTopSale] = useState<any>([]);
  const [topBuy, setTopBuy] = useState<any>([]);
  const [topSell, setTopSell] = useState<any>([]);

  const [topLatest, setTopLatest] = useState<any>([]);
  const { data, isSuccess } = useGetProductsQuery({});
  const [limit, setLimit] = useState(8);
  const [limitTopSell, setLimitTopSell] = useState(8);
  const [LimitTopSale, setLimitTopSale] = useState<number>(0);
  const [LimitTopLatest, setLimitTopLatest] = useState<number>(0);
  const [loadMoreLimit, setLoadMoreLimit] = useState<number>(0);
  const [modalView, setViewModal] = useState(null);
  //POPUP
  const [openPopup, setOpenPopup] = useState(true);

  const [productList, setProductList] = useState([]);
  //api
  const { data: fetchTopSale, isSuccess: isSuccessTopSale } =
    useGetTopSaleQuery({ offset: 0, limit: limit + limit * LimitTopSale });
  const { data: fetchTopSell, isSuccess: isSuccessTopSell } =
    useGetTopSellQuery({ offset: 0, limit: limitTopSell + limitTopSell * LimitTopSale });
  const { data: fetchTopBuy, isSuccess: isSuccessTopBuy } = useGetTopBuyQuery(
    {}
  );
  const { data: fetchTopLatest, isSuccess: isSuccessTopLatest } =
    useGetTopLatestQuery({ offset: 0, limit: limit + limit * LimitTopLatest });
  //fetchPopup
  const { data: fetchPopup, isSuccess: isSuccessPopup } = useGetPopupQuery({});

  useEffect(() => {
    if (isSuccess) {
      setProductList(data.products);
    }
  }, [data]);

  //get top buy products
  useEffect(() => {
    isSuccessTopBuy && setTopBuy(fetchTopBuy);
  }, [fetchTopBuy]);

  //get top latest products
  useEffect(() => {
    isSuccessTopLatest && setTopLatest(fetchTopLatest);
  }, [fetchTopLatest]);

  //get top sale products
  useEffect(() => {
    isSuccessTopSale && setTopSale(fetchTopSale);
  }, [fetchTopSale]);

  //get top sell products
  useEffect(() => {
    isSuccessTopSell && setTopSell(fetchTopSell);
  }, [fetchTopSell]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isMobile()) {
        setLimit(4);
        setLimitTopSell(5);
      }
    }
  }, []);

  const isMobile = () => {
    if (typeof document !== "undefined") {
      return window.innerWidth <= 768;
    }
    return true;
  };

  if (typeof document !== "undefined") {
    const element = document.querySelector("#hottest-block");
    horizontalWheel(element);
  }
  ///scroll mouse wheel
  function horizontalWheel(container:any) {
    /** Max `scrollLeft` value */
    let scrollWidth:any;

    /** Desired scroll distance per animation frame */
    let getScrollStep = () => scrollWidth / 100 /* ADJUST TO YOUR WISH */;

    /** Target value for `scrollLeft` */
    let targetLeft:any;

    function scrollLeft() {
      let beforeLeft = container.scrollLeft;
      let wantDx = getScrollStep();
      let diff = targetLeft - container.scrollLeft;
      let dX = wantDx >= Math.abs(diff) ? diff : Math.sign(diff) * wantDx;

      // Performing horizontal scroll
      container.scrollBy(dX, 0);

      // Break if smaller `diff` instead of `wantDx` was used
      if (dX === diff)
        return;

      // Break if can't scroll anymore or target reached
      if (beforeLeft === container.scrollLeft || container.scrollLeft === targetLeft)
        return;

      requestAnimationFrame(scrollLeft);
    }

    container?.addEventListener('wheel', (e:any) => {
      e.preventDefault();

      scrollWidth = container.scrollWidth - container.clientWidth;
      targetLeft = Math.min(scrollWidth, Math.max(0, container.scrollLeft + e.deltaY));

      requestAnimationFrame(scrollLeft);
    });
  }

  const handleExpiredDate = (data:any) => {
    if (typeof window !== "undefined") {
      const showToday = +getCookie('ShowTodayDate');
      const currDate = new Date().getTime();
      data?.map((x:any) => {
        let start = moment(x?.start_at).valueOf();
        let end = moment(x?.end_at).valueOf();
        if (start <= currDate && currDate <= end) {
          // if ((showToday < currDate) && window?.innerWidth > 768) {
          //   return dispatch(
          //     openModal({
          //       template: "home-popup-modal",
          //       data: x
          //     })
          //   );
          // }
        }
      })
    }
  };

  useEffect(() => {
    if (isSuccessPopup) {
      if (typeof window !== "undefined") {
        if (isMobile()) {
          const dataCustomMobile = fetchPopup?.filter((x:any) => !x.is_hide && x.is_mobile)

          !!dataCustomMobile?.length && handleExpiredDate(dataCustomMobile)
        } else {
          const dataCustomPC = fetchPopup?.filter((x:any) => !x.is_hide && !x.is_mobile);
          !!dataCustomPC?.length && handleExpiredDate(dataCustomPC)
        }
      }
    }
  }, [fetchPopup]);

  // const wishlistProducts = useSelector(getWishlistProductsState);
  const wishlistProducts :any= [];
  return (
    <>
      {/* <Head>
        <link rel="shortcut icon" href="/public/favicon.ico" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head> */}

     {/* <NextSeo {...metadataSeo} 
        />  */}
      {/* <div className="popup">
        <HomePopUp isOpen={openPopup} onClose={() => setOpenPopup(false)} data={popupData} />
      </div> */}
      <div className="wrapper">
        {/* sale item */}
        {topSale?.products?.length > 0 && (
          <div className="sale-items">
            <div className="home-title">
              {/* <Typography.Title
                style={{
                  fontFamily: "Pretendard",
                  lineHeight: "28px",
                  fontSize: "20px",
                  color: "#9E9E9E",
                }}
              >
                올해 초, 가장 핫한 아이템
              </Typography.Title> */}
              <Typography.Title>
                {t('home_page.sale_item')}
              </Typography.Title>
            </div>
            {/* sale items */}
            <Row gutter={[16, 24]}>
              {topSale?.products?.length > 0 ? (
                topSale?.products?.map((product: any, i: any) => {
                  const itemId = setItemWishlist(wishlistProducts, product?.id)

                  const myLoader = ({ src, width, quality }:any) => {
                    if (product?.thumbnail) {
                      return product.thumbnail;
                    } else {
                      return "";
                    }
                  };
                  return (
                    <Col key={i} span={isMobile() ? 12 : 6}>

                      {/* <ProductCard
                        itemId={itemId}
                        id={product?.id}
                        delivery_type={product?.delivery_type_id}
                        title={renderBrandName(product)}
                        description={product?.title}
                        // init_price={product?.price_cost}
                        // sale_price={product?.price?.price}
                        init_price={product?.price_product ?? 0}
                        sale_price={product?.price_sell ?? 0}
                        loader={myLoader}
                        img={product?.thumbnail ? product?.thumbnail : item5}
                        isDisplayHome
                        sx={{
                          width: isMobile() ? "160px" : "282px",
                        }}
                      /> */}
                    </Col>
                  );
                })
              ) : (
                <div className="no-matching-message">
                  {t("search_result.not_matching")}
                </div>
              )}
            </Row>
            {topSale?.count > limit + limit * LimitTopSale && (
              <div className="load-more-wrapper">
                <div
                  className="load-more"
                  onClick={() =>
                    setLimitTopSale((pre) => {
                      return pre + 1;
                    })
                  }
                >
                  {t('MainView.see_more')}
                </div>
              </div>
            )}
          </div>
        )}

        {/* top-ranking */}
        {topSell?.products?.length > 0 && (
          <div className="top-ranking">
            <div className="home-title">
              <Typography.Title className="title1">
                {t('home_page.top5')}
              </Typography.Title>
              <Typography.Title className="title2">
                {t('home_page.keyword_ranking')}
              </Typography.Title>
            </div>
            <div className="top-ranking-container">
              {isMobile() && topSell?.products?.length > 0 &&
                (
                  <Col className="pictures" span={10}>
                    <Image
                      alt={`items-img`}
                      className="items-img"
                      src={topSell?.products[0]?.thumbnail ? topSell?.products[0]?.thumbnail : item2}
                      width={335}
                      height={240}
                      loader={({ src, width, quality }) => {
                        return src;
                      }}
                      onClick={() =>
                        router.push(`/productDetail?id=${topSell?.products[0]?.id}`)
                      }
                    />
                  </Col>
                )
              }
              <Row gutter={24}>
                <Col className="left-list" span={8}>
                  {topSell?.products.map((sell:any, idx:any) => {
                    if (idx < 5)
                      return (
                        <div className="ranking-items">
                          {idx + 1}.&emsp;
                          <div className="ranking-unit"
                            style={{ cursor: isMobile() ? 'pointer' : 'default' }}
                            onClick={() =>
                              isMobile() && router.push(`/productDetail?id=${sell?.id}`)
                            }
                          >{sell?.title}</div>
                          <div
                            className="see-more"
                            onClick={() =>
                              router.push(`/productDetail?id=${sell?.id}`)
                            }
                          >
                            {t('MainView.see_more')}
                          </div>
                        </div>
                      );
                  })}
                </Col>

                {!isMobile() && !!topSell?.products?.length &&
                  topSell?.products.map((sell:any, idx:any) => {
                    const myLoader = ({ src, width, quality }:any) => {
                      return sell?.thumbnail;
                    };
                    if (idx === 0)
                      return (
                        <Col className="pictures" span={10}>
                          <Image
                            alt={`items-img-${idx}`}
                            className="items-img"
                            src={sell?.thumbnail ? sell?.thumbnail : item2}
                            width={200}
                            height={200}
                            loader={myLoader}
                            onClick={() =>
                              router.push(`/productDetail?id=${sell?.id}`)
                            }
                          />
                        </Col>
                      );
                    if (idx === 1)
                      return (
                        <Col className="pictures" span={6}>
                          <Image
                            alt={`items-img-${idx}`}
                            className="items-img-second"
                            src={sell?.thumbnail ? sell?.thumbnail : item2}
                            width={10}
                            height={10}
                            loader={myLoader}
                            onClick={() =>
                              router.push(`/productDetail?id=${sell?.id}`)
                            }
                          />
                        </Col>
                      );
                  })}
              </Row>
            </div>
          </div>
        )}
        {/* hot-trend-of-year Cochamol Discounts */}
        <div className="sale-items">
          {topBuy?.products?.length > 0 && (
            <>
              <div className="home-title">
                <Typography.Title >
                  {t('category.brand_hall.keep_buying_again_title_first')}
                  {/* {t('hottest_product_sale')} */}
                </Typography.Title>
              </div>
              <div className="Carousel">
                <div className="hot-trend-item" id="hottest-block">
                  {topBuy?.products?.length > 0 &&
                    topBuy?.products.map((product :any, i:any) => {
                      const itemId = setItemWishlist(wishlistProducts, product?.id)

                      const myLoader = ({ src, width, quality }:any) => {
                        return product?.thumbnail;
                      };
                      return (
                        <>
                          <div className="single-item">
                            {/* <ProductCard
                              itemId={itemId}
                              id={product?.id}
                              delivery_type={product?.delivery_type_id}
                              title={renderBrandName(product)}
                              description={product?.title}
                              init_price={product?.price_product ?? 0}
                              sale_price={product?.price_sell ?? 0}
                              loader={myLoader}
                              img={
                                product?.thumbnail ? product?.thumbnail : item5
                              }
                              isDisplayHome
                              sx={{
                                width: isMobile() ? "138px" : "282px",
                              }}
                            /> */}
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </>
          )}
          {/* latest product*/}
          {topLatest?.products?.length > 0 && (
            <div className="sale-items" style={{ paddingBottom: "0px" }}>
              <div className="home-title">
                <Typography.Title >
                  {t('category.brand_hall.hot_items_title')}
                </Typography.Title>
              </div>
              <Row gutter={[16, 24]}>
                {!!topLatest?.products?.length &&
                  topLatest?.products?.map((product: any, i: any) => {
                    const itemId = setItemWishlist(wishlistProducts, product?.id)

                    const myLoader = ({ src, width, quality }:any) => {
                      return src;
                    };
                    return (
                      <>
                        <Col span={isMobile() ? 12 : 6} key={product?.id ?? i}>

                          {/* <ProductCard
                            itemId={itemId}
                            id={product?.id}
                            delivery_type={product?.delivery_type_id}
                            title={renderBrandName(product)}
                            description={product?.title}
                            init_price={product?.price_product ?? 0}
                            sale_price={product?.price_sell ?? 0}
                            loader={myLoader}
                            img={
                              product?.thumbnail ? product?.thumbnail : item5
                            }
                            isDisplayHome
                            sx={{ width: isMobile() ? "160px" : "282px", }}
                          /> */}
                        </Col>
                      </>
                    );
                  })}
              </Row>
              {topLatest?.count > limit + limit * LimitTopLatest && (
                <div className="load-more-wrapper">
                  <div
                    className="load-more"
                    onClick={() =>
                      setLimitTopLatest((pre) => {
                        return pre + 1;
                      })
                    }
                  >
                    {t('MainView.see_more')}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {isMobile() &&
          <Image
            src={icToTop}
            className="to-top"
            alt="to-top"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          />
        }
      </div>
    </>
  );
};


// export const getStaticProps: GetStaticProps = async ({ locale }) => {

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}store/popups?type=main`);
//   const popup = await res.json();
//   return {
//     props: {
//       ...(await serverSideTranslations(locale ?? DEFAULT_LANG, ["common"])),
//       popup
//     }
//   }
// }
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? DEFAULT_LANG, ["common"])),
  },
});

export default Home;
