"use client"

import { ThemeProvider, useTheme } from "@/contexts/ui-theme-context"
import { fontApplier } from "@/twj-lib/font-applier"
import { cn } from "@/twj-lib/tw"
import { Theme, TWJComponentsProps } from "@/twj-lib/types"
import { AnimatePresence, motion } from "motion/react"
import { createContext, useContext, useEffect, useState } from "react"

// 1. Context Definition
type TabsContextType = {
    selectedTab: string
    changeSelectedTab: (tab: string) => void
    theme: Theme
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

export const useTabsContext = () => {
    const tabsContext = useContext(TabsContext)
    if (!tabsContext) {
        throw new Error("useTabsContext must be used within a TabsProvider")
    }
    return tabsContext
}

// 2. Main Tabs Component (Acts as the Provider)
interface TabsProps extends TWJComponentsProps {
    children: React.ReactNode
    defaultValue: string
    className?: string
    onTabChange?: (tab: string) => void // ✅ Now implemented
}

export const Tabs = ({ children, theme, defaultValue, className, onTabChange }: TabsProps) => {
    const [selectedTab, setSelectedTab] = useState(defaultValue)
    const { theme: contextTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const id = setTimeout(() => setMounted(true), 0)
        return () => clearTimeout(id)
    }, [])

    const activeTheme = theme || contextTheme || "modern"
    const appliedTheme = mounted ? activeTheme : "modern"
    
    const fontClass = fontApplier(appliedTheme)
    const themeClass = `theme-${appliedTheme}`

    // ✅ Logic Update: Wrap the state setter to trigger onTabChange
    const handleTabChange = (tab: string) => {
        setSelectedTab(tab)
        if (onTabChange) {
            onTabChange(tab)
        }
    }

    const contextValue = {
        selectedTab,
        changeSelectedTab: handleTabChange, // Pass the wrapper instead of raw setter
        theme: appliedTheme
    }

    return (
        <TabsContext.Provider value={contextValue}>
            <ThemeProvider initialTheme={appliedTheme} key={appliedTheme}>
                <div className={cn(
                    fontClass, 
                    themeClass, 
                    "flex flex-col w-full",
                    className
                )}>
                    {children}
                </div>
            </ThemeProvider>
        </TabsContext.Provider>
    )
}

// 3. Tabs List Container
export const TabsList = ({children, className}: {children: React.ReactNode; className?: string}) => {
    const {theme} = useTabsContext()
    return (
        <div className={cn(
            "tabs-list w-fit p-0.5",
            'flex gap-1 mb-4 overflow-hidden',
            'bg-surface dark:bg-surface-dark',
            'border rounded-theme border-foreground/20',
            theme === 'brutalist' && [
                'border-2 border-border dark:border-border-dark',
                'shadow-[4px_4px_0_0_rgb(0,0,0)] shadow-foreground dark:shadow-foreground-dark',
                'bg-surface'
            ],
            className
        )}>{children}</div>
    )
}

// 4. Individual Tab Button
// ✅ Updated props to extend HTMLButtonElement so 'onClick' works naturally
interface TabProps extends React.ComponentProps<"button"> {
    tab: string
    children?: React.ReactNode
    className?: string
    title?: string
}

export const Tab = ({ tab, children, className, title, onClick, ...props }: TabProps) => {
    const { selectedTab, changeSelectedTab } = useTabsContext()

    const isActive = selectedTab === tab

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // 1. Switch the tab in context
        changeSelectedTab(tab)
        
        // 2. Fire specific onClick handler if user provided one
        if (onClick) {
            onClick(e)
        }
    }

    return (
        <button
            type="button" // Good practice to prevent form submission
            className={cn(
                `tab`,
                'p-2 px-3 border rounded-theme',
                'transition ease-in-out',
                isActive ? 'bg-primary text-primary-foreground border-foreground/15' : 'bg-transparent text-foreground dark:text-foreground-dark border-transparent hover:bg-foreground/10',
                className
            )}
            onClick={handleClick} // ✅ Use the wrapper handler
            {...props} // ✅ Spread other props (disabled, id, etc.)
        >
            {children ? children : title}
        </button>
    )
}

// 5. Views
export const TabsView = ({children}: {children: React.ReactNode}) => {
    return <div className="tabs-view">{children}</div>
}

export const TabView = ({tab, children}: {tab: string; children: React.ReactNode}) => {
    const {selectedTab, theme} = useTabsContext()

    if (selectedTab !== tab) {
        return null
    }

    return (
        <ThemeProvider initialTheme={theme} key={theme}>
           <AnimatePresence initial={true}>
             <motion.div 
                initial={{ opacity: 0, transform: 'translateY(10px)' }}
                animate={{ opacity: 1, transform: 'translateY(0)' }}
                transition={{duration: 0.4}}
                exit={{ opacity: 0, transform: 'translateY(10px)' }}
                className={cn(
                    "tab-view", 
                    fontApplier(theme)
                )}
            >
                {children} 
            </motion.div>
           </AnimatePresence>
        </ThemeProvider>
    )
}