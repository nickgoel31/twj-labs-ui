const cardCode = `
<Card theme="modern">
      <CardHeader 
        title="Account Settings" 
        description="Manage your preferences"
        icon={<span style={{ fontSize: "24px" }}>
          <Settings />
        </span>} 
      />
      <CardBody>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label>Username</label>
            <Input theme="modern" type="text" placeholder="johndoe" style={{ padding: '8px' }} />
        </form>
      </CardBody>
      <CardFooter className="pt-6">
        <Button theme="modern" style={{ padding: '8px 16px', cursor: 'pointer' }}>Save Changes</Button>
      </CardFooter>
    </Card>
`

export default cardCode;