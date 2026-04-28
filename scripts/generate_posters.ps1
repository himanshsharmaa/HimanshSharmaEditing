 $ErrorActionPreference = 'Continue'
 $videos = Get-ChildItem -Path ".\assets\videos\*" -File -ErrorAction SilentlyContinue | Where-Object { $_.Extension -in '.mp4','.mov','.webm' }
 if (-not $videos -or $videos.Count -eq 0) {
   Write-Output "No videos found in .\assets\videos."
   exit 0
 }
 $posterDir = Resolve-Path ".\assets\posters"
 foreach ($v in $videos) {
   $in = $v.FullName
   $name = [System.IO.Path]::GetFileNameWithoutExtension($v.Name)
   $out = Join-Path $posterDir.Path ($name + '.webp')
   Write-Output "Generating poster: $($v.Name) -> $out"
   & ffmpeg -hide_banner -loglevel error -ss 00:00:01 -i "$in" -vframes 1 -vf "scale=640:-2" -q:v 40 "$out"
   if ($LASTEXITCODE -ne 0) {
     Write-Output "ffmpeg failed for $($v.Name) with code $LASTEXITCODE"
   }
 }
 Write-Output "Poster generation complete." 
