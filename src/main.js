import { createApp } from 'vue'
import App from './App.vue'

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { 
	faList, 
	faGrip, 
	faTrashCan, 
	faPlus, 
	faBan, 
	faChartPie, 
	faPenToSquare, 
	faChevronDown, 
	faClipboardCheck, 
	faCircleNotch 
} from "@fortawesome/free-solid-svg-icons";

library.add(
	faList, 
	faGrip, 
	faTrashCan, 
	faPlus, 
	faBan, 
	faChartPie, 
	faPenToSquare, 
	faChevronDown, 
	faClipboardCheck, 
	faCircleNotch,
)

createApp(App)
	.component("font-awesome-icon", FontAwesomeIcon)
	.mount("#app");
