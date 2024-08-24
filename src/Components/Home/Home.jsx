import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from '../Header/Header'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import AllCategory from '../../Pages/Category/AllCategory'
import AddCategory from '../../Pages/Category/AddCategory'
import EditCategory from '../../Pages/Category/EditCategory'
import AllProduct from '../../Pages/Products/AllProduct'
import AddProduct from '../../Pages/Products/AddProduct'
import AllBanner from '../../Pages/Banners/AllBanner'
import AddBanner from '../../Pages/Banners/AddBanner'
import EditBanner from '../../Pages/Banners/EditBanner'
import AllShopBanner from '../../Pages/ShopBanner/AllShopBanner'
import AddShopBanner from '../../Pages/ShopBanner/AddShopBanner'
import EditShopBanner from '../../Pages/ShopBanner/EditShopBanner'
import AllTags from '../../Pages/Tags/AllTags'
import AddTag from '../../Pages/Tags/AddTag'
import EditTag from '../../Pages/Tags/EditTag'
import AllVoucher from '../../Pages/Vouchers/AllVoucher'
import CreateVoucher from '../../Pages/Vouchers/AddVoucher'
import AllOrder from '../../Pages/Orders/AllOrder'
import AllUsers from '../../Pages/Users/AllUsers'
import AllState from '../../Pages/state/AllState'
import AddState from '../../Pages/state/AddState'
import Editstate from '../../Pages/state/Editstate'
import AllCity from '../../Pages/City/AllCity'
import AddCity from '../../Pages/City/AddCity'
import Editcity from '../../Pages/City/Editcity'
import EditCinema from '../../Pages/Products/EditCinema'
import SinglePageDetails from '../../Pages/Users/SinglePageDetails'
import AddmanualHoading from '../../Pages/Banners/AddmanualHoading'
import AddManualcinema from '../../Pages/Products/AddManualcinema'
import AllMedia from '../../Pages/Media/AllMedia'
import AddMedia from '../../Pages/Media/AddMedia'
import EditMedia from '../../Pages/Media/EditMedia'
import SinglePageDtata from '../../Pages/Orders/SinglePageDtata'

const Home = () => {
  return (
    <>

      <Header />
      <div className="rightside">
        <Routes>
          <Route path={"/dashboard"} element={<Dashboard />} />

          {/* Category --  */}
          <Route path={"/all-category"} element={<AllCategory />} />
          <Route path={"/add-category"} element={<AddCategory />} />
          <Route path={"/edit-category/:_id"} element={<EditCategory />} />

          <Route path={"/all-media"} element={<AllMedia />} />
          <Route path={"/add-media"} element={<AddMedia />} />
          <Route path={"/edit-media/:_id"} element={<EditMedia />} />

          {/* Product --  */}
          <Route path={"/all-products"} element={<AllProduct />} />
          <Route path={"/add-product"} element={<AddProduct />} />
          <Route path={"/edit-cinema/:_id"} element={<EditCinema />} />
          <Route path={"/add-cinema-manual"} element={<AddManualcinema />} />


          {/* --- Orders --- */}
          <Route path={"/all-users"} element={<AllUsers />} />
          <Route path={"/user/:_id"} element={<SinglePageDetails />} />

          {/* --- Vouchers --- */}
          <Route path={"/all-voucher"} element={<AllVoucher />} />   {/* // All Vouchers */}
          <Route path={"/add-voucher"} element={<CreateVoucher />} />

          {/* --- Tags --- */}
          <Route path={"/all-tags"} element={<AllTags />} />
          <Route path={"/add-tag"} element={<AddTag />} />
          <Route path={"/edit-tag/:_id"} element={<EditTag />} />

          <Route path={"/all-state"} element={<AllState />} />
          <Route path={"/add-state"} element={<AddState />} />
          <Route path={"/edit-state/:_id"} element={<Editstate />} />

          <Route path={"/all-city"} element={<AllCity />} />
          <Route path={"/add-city"} element={<AddCity />} />
          <Route path={"/edit-city/:_id"} element={<Editcity />} />

          {/* --- Banners --- */}
          <Route path={"/all-banners"} element={<AllBanner />} />
          <Route path={"/add-banner"} element={<AddBanner />} />
          <Route path={"/edit-banner/:_id"} element={<EditBanner />} />
          <Route path={"/add-banner/manual"} element={<AddmanualHoading />} />

          {/* --- Banners --- */}
          <Route path={"/all-shop-banners"} element={<AllShopBanner />} />
          <Route path={"/add-shop-banner"} element={<AddShopBanner />} />
          <Route path={"/edit-shop-banner/:id"} element={<EditShopBanner />} />

          {/* --- Orders --- */}
          <Route path={"/all-orders"} element={<AllOrder />} />
          <Route path={"/single-data/:_id"} element={<SinglePageDtata />} />
        





          {/* all-shop */}

        </Routes>
      </div>

    </>
  )
}

export default Home