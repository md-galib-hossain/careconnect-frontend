export const timeFormatter = (time: string) => {
    const date = new Date(time);
  
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    // const ampm :string = Number(hours) >= 12 ? "PM" : "AM"
  // ${ampm}
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };