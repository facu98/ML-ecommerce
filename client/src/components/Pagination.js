import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { useLocation, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    display: 'flex',
    justifyContent: 'center',

  },
}));

export default function PaginationOutlined(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  var params = new URLSearchParams(location.pathname.slice(1));
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    params.delete("page");
    params.append("page", value);
    history.push(params.toString());
    setPage(value);
  };

  useEffect(() => {
    params.get('page') ? setPage(parseInt(params.get('page')) ) : setPage(1)
  }, [location])

  return (
    <div className={classes.root}>
      <Pagination
        size = 'large'
        count={Math.floor(props.total / 30)}
        page={page}
        onChange={handleChange}
        variant="outlined"
      />
    </div>
  );
}
