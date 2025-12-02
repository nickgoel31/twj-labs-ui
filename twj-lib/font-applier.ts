import type { Theme } from "./types"

export const fontApplier = (theme: Theme) => {
    
    switch(theme){
        case 'modern':
            return 'font-modern'
        case 'futuristic':
            return 'font-futuristic'
        case 'brutalist':
            return 'font-brutalist'
        // case 'classic':
        //     return 'font-classic'
        // case 'minimalist':
        //     return 'font-minimalist'
        // case 'retro':
        //     return 'font-retro'
        // case 'neon':
        //     return 'font-neon'
        // case 'cyberpunk':
        //     return 'font-cyberpunk'
        case 'elegant':
            return 'font-elegant'
        case 'playful':
            return 'font-playful'
        case 'organic':
            return 'font-organic'
        // Add more cases as needed for other themes
        // If you have a default font, you can return it here
        default:
            return 'font-default' // Fallback font
    }
}