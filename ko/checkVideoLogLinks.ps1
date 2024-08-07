$fullPaths = Get-Childitem –Path _videochanges -Filter *.md -Recurse | %{$_.FullName}
Write-Host $fullPaths.Length "_videochanges/* files to check"
foreach ($path in $fullPaths)
{
	foreach ($line in Get-Content $path)
	{
		$url = $null
		# // TODO: find actual url from CSV file and and hit it. this script was based on old _videochanges which had teachable url in it
		if ($line.Contains("teachable:"))
		{
			$url = $line.Split(':', 2)[1].Trim()
		}
		elseif ($line.Contains("udemy:"))
		{
			# udemy bot detection prevents us from doing this :(
			continue;
			$url = $line.Split(':', 2)[1].Trim()
		}
		else
		{
			continue;
		}
		
		try
		{
			$response = Invoke-WebRequest -Uri $url -Method head -ErrorAction Stop
			# This will only execute if the Invoke-WebRequest is successful.
			$statusCode = $Response.StatusCode
		}
		catch
		{
			$statusCode = $_.Exception.Response.StatusCode.value__
		}
		
		$fileName = Split-Path -Path $path -Leaf
		Write-Host $fileName ">" $statusCode
		
		if ($statusCode -ne 200)
		{
			Write-Error("[" + $statusCode + "]`n- " + $fileName + "`n- " + $url)
		}
	}
}