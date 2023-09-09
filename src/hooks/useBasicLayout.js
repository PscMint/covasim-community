import {useBreakpoints, breakpointsTailwind} from "@vueuse/core";
export  function useBasicLayout(){
    const breakPoints = useBreakpoints(breakpointsTailwind)
    const isMobile = breakPoints.smaller('sm')
    return {isMobile}
}

