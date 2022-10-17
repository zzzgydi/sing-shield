import { NavLink, Route, Routes } from "react-router-dom";
import { routes } from "./_router";

export const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-none flex flex-col py-5 px-3">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            end
            className={({ isActive }) =>
              isActive
                ? "rounded-lg bg-slate-300 mb-3 shadow"
                : "rounded-lg bg-slate-100 mb-3 hover:bg-slate-200 shadow"
            }
          >
            <div className="w-[120px] h-[42px] text-slate-700 flex items-center justify-center">
              {route.name}
            </div>
          </NavLink>
        ))}
      </div>

      <div className="overflow-y-auto w-full">
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
};
