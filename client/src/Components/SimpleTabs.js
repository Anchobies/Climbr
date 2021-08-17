import React from 'react';
import { useHistory } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const AntTabs = withStyles({
    indicator: {
      backgroundColor: '#FE3B8B',
    },
  })(Tabs);
  
  const AntTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      minWidth: 72,
      minHeight: 70,
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 30,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        color: '#FE3B8B',
        opacity: 1,
      },
      '&$selected': {
        color: '#FE3B8B',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: '#FE3B8B',
      },
    },
    selected: {},
  }))((props) => <Tab disableRipple {...props} />);

export default function SimpleTabs({ value, setValue }) {
    const history = useHistory();

    const handleTabs = (e, newValue) => {
      setValue(newValue);
      history.push(newValue);
    }

  return (
    <div className="tabs">
        <AntTabs value={value} onChange={handleTabs} aria-label="ant example">
            <AntTab value="/" label="FEED" />
            <AntTab value="/create" label="CREATE A CLIMB" />
            <AntTab value="/climbs" label="MY CLIMBS" />
            <AntTab value="/profile" label="MY PROFILE" />
        </AntTabs>
    </div>
  );
}