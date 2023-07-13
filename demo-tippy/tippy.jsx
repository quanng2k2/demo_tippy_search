import SvgIcon from "../../../../../SvgIcon/SvgIcon";
import Tippy from "@tippyjs/react/headless";
import { useEffect, useState } from "react";
import { iconSearch } from "../../../../../SvgIcon/iconsRepo";
import { Link } from "react-router-dom";

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [searchShow, setSearchShow] = useState("");

  // console.log(searchShow, "<------");

  // console.log(searchResult, "<------api");

  useEffect(() => {
    if (!searchShow.trim()) {
      setShowResult(false);
      return;
    }
    fetch(
      `http://localhost:3003/api/v1/product/search/${encodeURIComponent(
        searchShow
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchResult(data.user);
      });
  }, [searchShow]);

  const handleHideResult = () => {
    setShowResult(false);
  };

  return (
    <Tippy
      visible={showResult && searchResult.length > 0}
      placement="bottom"
      interactive
      excludeSelf={true}
      render={(attrs) => (
        <div className="search-result" tabIndex="-1" {...attrs}>
          {searchResult.map((product, index) => (
            <div key={index} className="wrapper-search">
              <Link
                to={`/product/${product.product_id}`}
                className="now-list-restaurant-row"
              >
                <div className="item-restaurant">
                  <a className="item-contentt" href="">
                    <div className="img-result">
                      <img
                        src={product.img_product}
                        alt={product.name_product}
                        title={product.name_product}
                      />
                    </div>
                    <div className="info-restaurantt">
                      <div className="name-res">{product.name_product}</div>
                      <div className="address-res">
                        {product.address_product}
                      </div>
                    </div>
                    <div className="opentime-statuss">
                      {product.status_product ? (
                        <span className="open-result" title="Mở cửa"></span>
                      ) : (
                        <div className="off">
                          <span
                            className="closed-result"
                            title="Đóng cửa"
                          ></span>
                        </div>
                      )}
                    </div>
                  </a>
                </div>
              </Link>
            </div>
          ))}

          {/* aaaaaaaaaaa */}
          <div className="content-srch">
            <span className="iconn">
              <i className="fas fa-search"></i>
            </span>
            Tìm thêm kết quả cho <span className="key-word">{searchShow}</span>
          </div>
        </div>
      )}
      onClickOutside={handleHideResult}
    >
      <div className="from-search">
        <div className="input-search">
          <input
            onChange={(e) => {
              setSearchShow(e.target.value);
              setShowResult(true);
            }}
            type="text"
            placeholder="Tìm địa điểm, món ăn, địa chỉ..."
          />
          <div className="div-btnsearch">
            <a href="/category">
              <button type="button" className="btn-search">
                <span>{<SvgIcon icon={iconSearch} />}</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </Tippy>
  );
}

export default Search;
