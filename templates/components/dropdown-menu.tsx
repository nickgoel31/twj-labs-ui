const dropdownCode = `
<DropdownMenu theme='modern'>
            <DropdownMenuTrigger>
                <Button theme='modern'>Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => console.log('Action 1')}>
                        Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log('Action 2')}>
                        Documentation
                    </DropdownMenuItem>
                    <div className="h-px bg-muted/50 my-1"/>
                    <DropdownMenuItem danger onClick={() => console.log('Action 3')}>
                        Delete Project
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        Invite Colleagues (Disabled)
                    </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
`

export default dropdownCode;