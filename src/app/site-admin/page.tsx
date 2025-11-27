import AdminNavBar from "@/components/ui/admin-section/admin-navBar/adminNavBar"
import AdminOverview from "@/components/ui/admin-section/admin-overview/adminOverview"
import AdminCategorySection from "@/components/ui/admin-section/category/section"
export default function AdminDashBoard(){
    return(
         <>
          <AdminNavBar/>
          <AdminOverview/>
          <div className="px-5">
            <AdminCategorySection/>
          </div>
        </>
)           
}