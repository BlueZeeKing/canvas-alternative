export default function setIndex(index: number, value: string, url: string) {
  if (typeof window != "undefined" && window.localStorage.getItem("breadcrumb")) {
    let storage = [{ name: "Dashboard", url: "/" }];
    
    storage = JSON.parse(window.localStorage.getItem("breadcrumb"));

    storage[index] = { name: value, url: url };
    window.localStorage.setItem(
      "breadcrumb",
      JSON.stringify(storage.slice(0, index + 1))
    );
  }
}