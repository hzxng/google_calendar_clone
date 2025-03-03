export const css = `
  .rdp-day {
    height: 26px;
    font-size: 10px;

    button {
      width: 24px;
      height: 24px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border-radius: 50%;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: #e7e8eb;
      } 
    }
  }

  .rdp-day.rdp-today {
    button {
      color: rgb(255, 255, 255) !important;
      background-color: rgb(11, 87, 208) !important;
      border-radius: 50%;
    }
  }

  .rdp-day.rdp-selected {
    button {
      background-color: rgb(194, 231, 255);
      border-radius: 50%;
      border: none;
      font-weight: 500;
    }
  }

  .rdp-outside {
    opacity: 1;
  }

  .rdp-outside.rdp-selected {
    button {
      background-color: rgb(221, 227, 234);
    }
  }

  .rdp-weekday {
    height: 26px;
    font-size: 10px;
  }

  .rdp-caption_label {
    font-size: 14px;
    font-weight: 500;
    padding-left: 9px;
  }

  .rdp-month_caption {
    height: 32px;
  }
  
  .rdp-nav {
    gap: 6px;
    width: 54px;
    height: 25px;
    margin-top: 1.5px;
    margin-right: 3px;
  
    button {
      width: 24px;
      height: 25px;
    }

    svg {
      width: 12px;
      height: 12px;
      fill: rgb(31, 31, 31);
    }
  }

  .rdp-button_next,
  .rdp-button_previous {
    border-radius: 50%;
    transition: background-color 0.1s ease-in-out;

    &:hover {
      background-color: #e7e8eb;
    }
  } 
`
