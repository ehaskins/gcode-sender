import { useEffect, useRef } from 'react'
import * as React from 'react'
import * as Babylon from 'babylonjs'

export function FloatingSquare() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    console.log('Creating scene')

    const canvas = canvasRef.current

    const engine = new Babylon.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    })

    var scene = new Babylon.Scene(engine)
    var camera = new Babylon.ArcRotateCamera(
      'Camera',
      -Math.PI / 2,
      Math.PI / 2,
      5,
      Babylon.Vector3.Zero(),
      scene
    )
    camera.attachControl(canvas, true)

    var light = new Babylon.HemisphericLight(
      'light1',
      new Babylon.Vector3(1, 0.5, 0),
      scene
    )
    light.intensity = 0.8

    const lines = [
      [new Babylon.Vector3(0, 0, 0), new Babylon.Vector3(0, 0, 10)],
      [new Babylon.Vector3(0, 0, 10), new Babylon.Vector3(0, 10, 10)],
      [new Babylon.Vector3(0, 10, 10), new Babylon.Vector3(0, 10, 0)],
      [new Babylon.Vector3(0, 10, 0), new Babylon.Vector3(0, 0, 0)],
    ]

    const normalLines = Babylon.MeshBuilder.CreateLineSystem(
      'normalLines',
      { lines },
      scene
    )

    engine.runRenderLoop(function () {
      if (scene) {
        scene.render()
      }
    })

    return function cleanup() {
      console.log('Cleaning')
      engine.stopRenderLoop()
    }
  })

  return <canvas ref={canvasRef} width="400px" height="400px" />
}
