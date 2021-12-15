
const apiDomain = localStorage.getItem("Burl"); 
localStorage.setItem("Burl", apiDomain);

const apiServices = {
	CountryService: {
		GetCountryFlag: apiDomain + "flag"	
	}
}

export {apiServices}
