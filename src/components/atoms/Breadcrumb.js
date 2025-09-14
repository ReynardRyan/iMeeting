import { Link } from "react-router-dom";

const CustomBreadcrumb = ({ items }) => {
  return (
    <nav style={{ "--bs-breadcrumb-divider": "'>'" }} aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li
            className={`breadcrumb-item ${
              item.path ? "nonActive-breadcrumb" : "active-breadcrumb"
            }`}
            key={index}
          >
            {item.path ? (
              <Link
                to={item.path}
                className="text-decoration-none nonActive-breadcrumb"
              >
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CustomBreadcrumb;
